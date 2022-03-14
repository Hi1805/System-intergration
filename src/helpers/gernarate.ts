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

export const getPasswordByRequest = (
  { email, password, uid_gg }: Partial<RequestAuth>,
  type_auth: typeAuth
) => {
  switch (type_auth) {
    case 'google':
      return _toString(email) + _toString(uid_gg);
    default:
      return _toString(password);
  }
};
