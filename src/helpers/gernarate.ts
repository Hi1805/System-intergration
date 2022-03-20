import bcrypt from 'bcrypt';
import _toString from 'lodash/toString';
export const generateHashPassword = (
  { email, password, uid_gg }: Partial<RequestAuth>,
  type_auth: typeAuth
) => {
  switch (type_auth) {
    case 'manual':
      return bcrypt.hashSync(_toString(password), 10);
    case 'google':
      return bcrypt.hashSync(_toString(email) + _toString(uid_gg), 10);
    default:
      return bcrypt.hashSync(_toString(password), 10);
  }
};



export const generateFormEmail = (otp: string, purpose: string) => {
  return `  <h2>Your OTP for Be The Heroes</h2>
  <h4>Your OTP is: <strong style="font-size:1rem">${otp}</strong></h4>
  <h4>Please use this OTP to ${purpose}</h4>
  <h4>This OTP will expire in 5 minutes</h4>
  <h4>If you did not request this, please ignore this email</h4>
  <h4>Thank you, OFA Team</h4>
  <a href="https://data-school-management.vercel.app/forgot-password">Website: Be The Heroes</a>`;
};
