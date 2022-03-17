type typeAuth = 'manual' | 'google' | 'facebook';
interface RequestAuth {
  email: string;
  password: string;
  uid_gg: string;
  uid_fb: string;
  username: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  date_of_birth?: Date;
  emailVerified: boolean;
}
