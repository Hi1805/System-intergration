import { Request, Response } from 'express';
import { totp } from 'otplib';
import { mainModel } from '../../database/be_the_heroes';
import { firebaseAuth } from '../../database/firebase';
import { generateFormEmail } from '../../helpers/gernarate';
import { sendMail } from '../../helpers/send';
import _toString from 'lodash/toString';
import jwt from 'jsonwebtoken';
const TIME_OTP = 5;
totp.options = {
  step: 60 * TIME_OTP,
};
class UserController {
  async changeEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { uid } = req.session;
      const isExistUser = await mainModel.users.findOne({
        where: {
          email,
        },
      });
      if (isExistUser) {
        return res.status(400).send({
          message: 'Email already exists',
        });
      }
      await mainModel.users.update(
        {
          email,
        },
        {
          where: {
            uid,
          },
          fields: ['email'],
        }
      );

      const otp = totp.generate(_toString(email));

      await sendMail(email, generateFormEmail(otp, 'Verify Account'));
      const token = jwt.sign(
        {
          ...req.session,
          email,
        },
        process.env.SECRET_KEY || ''
      );
      return res.status(200).send({
        message: `Sent OTP ${email} successfully`,
        data: { email, token },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { uid } = req.session;

      const data = await firebaseAuth().createUser({
        emailVerified: true,
        email,
      });
      await mainModel.users.update(
        {
          uid_gg: data.uid,
          level: 2,
        },
        {
          where: {
            uid,
          },
        }
      );
      return res.status(200).send({
        message: 'Verify email successfully',
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new UserController();
