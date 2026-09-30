const crypto = require('crypto');

/**
 * Generates the HMAC-SHA256 signature eSewa requires.
 *
 * The message format is EXACTLY:
 *   total_amount=<X>,transaction_uuid=<Y>,product_code=<Z>
 *
 * Fields must match signed_field_names and be in that order.
 * Output is Base64-encoded.
 */
function generateSignature({ totalAmount, transactionUuid, productCode, secretKey }) {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  return crypto.createHmac('sha256', secretKey).update(message).digest('base64');
}

/**
 * Verifies the signature that eSewa sends back in the success redirect.
 * The data param from eSewa is base64-encoded JSON.
 */
function verifyCallbackSignature({ decodedData, secretKey }) {
  // eSewa sends: total_amount, transaction_uuid, product_code in signed_field_names
  const { total_amount, transaction_uuid, product_code, signature } = decodedData;
  const expected = generateSignature({
    totalAmount: total_amount,
    transactionUuid: transaction_uuid,
    productCode: product_code,
    secretKey,
  });
  return expected === signature;
}

module.exports = { generateSignature, verifyCallbackSignature };
