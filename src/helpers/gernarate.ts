import bcrypt from 'bcrypt';
import _toString from 'lodash/toString';
import { v1 as uuidv1 } from 'uuid';
import { spaces } from '../database/spaces';

export const generateFormEmail = (otp: string, purpose: string) => {
  return `  <h2>Your OTP for Be The Heroes</h2>
  <h4>Your OTP is: <strong style="font-size:1rem">${otp}</strong></h4>
  <h4>Please use this OTP to ${purpose}</h4>
  <h4>This OTP will expire in 5 minutes</h4>
  <h4>If you did not request this, please ignore this email</h4>
  <h4>Thank you, OFA Team</h4>
  <a href="https://data-school-management.vercel.app/forgot-password">Website: Be The Heroes</a>`;
};

export const generatePhotoUrl = async (
  buff: Buffer | undefined,
  name: string
) => {
  try {
    const spaceParams = {
      Bucket: process.env.SPACES_BUCKET || '',
      Key: `${uuidv1()}.${name}`,
      Body: buff,
      ACL: 'public-read',
      ContentType: 'image/*',
    };

    const url = await spaces
      ?.upload(spaceParams)
      .promise()
      .then((res) => res.Location);
    return url;
  } catch (error) {
    throw new Error(error.message);
  }
};
