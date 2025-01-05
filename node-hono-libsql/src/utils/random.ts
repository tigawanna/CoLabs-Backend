import crypto from 'node:crypto';
export const randomToken = () => {
  return crypto.randomBytes(48).toString("hex");
};
