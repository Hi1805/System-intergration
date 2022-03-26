interface UserInfo {
  token: string;
  uid: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  status?: boolean;
  is_reported: boolean;
  is_locked: boolean;
  is_otp: boolean;
  date_of_birth: string;
  first_name: string;
  last_name: string;
}
declare namespace Express {
  export interface Request {
    session: UserInfo;
  }
}
