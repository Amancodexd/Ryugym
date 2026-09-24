const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { generateSignature, verifyCallbackSignature } = require('../signature');
const { createTransaction, getTransaction, updateTransaction } = require('../db');

const router = express.Router();

// ──────────────────────────────────────────────
// POST /api/initiate-payment
// Frontend calls this with { planKey, amount, cycle, name, email, phone }
// Backend generates a UUID + signature and returns the eSewa form fields.
// ──────────────────────────────────────────────
router.post('/initiate-payment', (req, res) => {
  const { planKey, amount, cycle, name, email, phone } = req.body;

  if (!planKey || !amount || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const productCode = process.env.ESEWA_PRODUCT_CODE;
  const secretKey = process.env.ESEWA_SECRET_KEY;
  const backendUrl = process.env.BACKEND_PUBLIC_URL;

  // amount must be a number string with 2 decimal places (e.g. "99.00")
  const totalAmount = parseFloat(amount).toFixed(2);

  const transactionUuid = uuidv4();

  const signature = generateSignature({ totalAmount, transactionUuid, productCode, secretKey });

  // persist the transaction so we can verify it later
  createTransaction(transactionUuid, {
    planKey,
    cycle,
    amount: totalAmount,
    name,
    email,
    phone,
  });

  return res.json({
    formUrl: process.env.ESEWA_PAYMENT_URL,
    fields: {
      amount: totalAmount,
      tax_amount: '0',
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: `${backendUrl}/api/payment/success`,
      failure_url: `${backendUrl}/api/payment/failure`,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature,
    },
  });
});

// ──────────────────────────────────────────────
// GET /api/payment/success
// eSewa redirects here after payment.
// We decode the data param, verify signature, then re-check with eSewa status API.
// ──────────────────────────────────────────────
router.get('/payment/success', async (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=error&reason=no_data`);
  }

  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
  } catch {
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=error&reason=bad_data`);
  }

  const secretKey = process.env.ESEWA_SECRET_KEY;

  // step 1: verify signature eSewa sent matches what we expect
  const signatureValid = verifyCallbackSignature({ decodedData: decoded, secretKey });
  if (!signatureValid) {
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=error&reason=signature_mismatch`);
  }

  const { transaction_uuid, total_amount, transaction_code, status } = decoded;

  // step 2: idempotency check — don't process the same txn twice
  const existing = getTransaction(transaction_uuid);
  if (!existing) {
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=error&reason=unknown_transaction`);
  }
  if (existing.status === 'COMPLETE') {
    // already processed — just redirect to success again safely
    return res.redirect(
      `${process.env.FRONTEND_ORIGIN}/membership.html?payment=success&txn=${transaction_uuid}`
    );
  }

  // step 3: re-verify with eSewa status API (never trust the redirect alone)
  const productCode = process.env.ESEWA_PRODUCT_CODE;
  const statusUrl = `${process.env.ESEWA_STATUS_URL}?product_code=${productCode}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;

  let statusData;
  try {
    const statusRes = await axios.get(statusUrl, { timeout: 8000 });
    statusData = statusRes.data;
  } catch (err) {
    console.error('eSewa status check failed:', err.message);
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=error&reason=status_check_failed`);
  }

  if (statusData.status !== 'COMPLETE') {
    updateTransaction(transaction_uuid, { status: 'FAILED', esewaRef: transaction_code });
    return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=failed`);
  }

  // payment confirmed — mark as complete
  updateTransaction(transaction_uuid, { status: 'COMPLETE', esewaRef: transaction_code });

  console.log(`Payment CONFIRMED — uuid: ${transaction_uuid}, ref: ${transaction_code}, amount: NPR ${total_amount}`);

  // redirect frontend to success page with txn id for voucher display
  return res.redirect(
    `${process.env.FRONTEND_ORIGIN}/membership.html?payment=success&txn=${transaction_uuid}&ref=${transaction_code}&amount=${total_amount}`
  );
});

// ──────────────────────────────────────────────
// GET /api/payment/failure
// eSewa redirects here when the user cancels or payment fails.
// ──────────────────────────────────────────────
router.get('/payment/failure', (req, res) => {
  console.warn('Payment failure/cancel redirect received:', req.query);
  return res.redirect(`${process.env.FRONTEND_ORIGIN}/membership.html?payment=failed`);
});

// ──────────────────────────────────────────────
// GET /api/payment/status/:uuid
// Frontend can poll this to check transaction status.
// ──────────────────────────────────────────────
router.get('/payment/status/:uuid', (req, res) => {
  const txn = getTransaction(req.params.uuid);
  if (!txn) return res.status(404).json({ error: 'Transaction not found.' });
  // return only safe fields — never expose the full internal record
  return res.json({
    status: txn.status,
    plan: txn.planKey,
    cycle: txn.cycle,
    amount: txn.amount,
    esewaRef: txn.esewaRef || null,
  });
});

module.exports = router;
