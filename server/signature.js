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
 *
 * eSewa's callback includes a `signed_field_names` field that lists which
 * fields were used to generate the signature, and in what order.
 * We must reconstruct the message using those exact fields and order.
 */
function verifyCallbackSignature({ decodedData, secretKey }) {
  if (!decodedData || !decodedData.signature) return false;

  // Primary: use signed_field_names provided by eSewa in the callback response
  if (decodedData.signed_field_names) {
    const fields = decodedData.signed_field_names.split(',');
    const message = fields
      .map((f) => `${f}=${decodedData[f] !== undefined ? decodedData[f] : ''}`)
      .join(',');
    const expected = crypto.createHmac('sha256', secretKey).update(message).digest('base64');
    if (expected === decodedData.signature) return true;
  }

  // Fallback: legacy 3-field format (in case signed_field_names is absent)
  const { total_amount, transaction_uuid, product_code, signature } = decodedData;
  const legacy = generateSignature({
    totalAmount: total_amount,
    transactionUuid: transaction_uuid,
    productCode: product_code,
    secretKey,
  });
  return legacy === signature;
}

module.exports = { generateSignature, verifyCallbackSignature };
