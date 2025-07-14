import crypto from "crypto";

export const generateSignature = (
  key: string,
  ctx: string,
  method: string = "SHA-256"
) => {
  const hmac = crypto.createHmac(method, key);
  hmac.update(ctx);
  return hmac.digest("hex");
};
