import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { totp } from 'otplib';
import { generateFormEmail } from '../../helpers/gernarate';
import { sendMail } from '../../helpers/send';
import _toString from 'lodash/toString';
import { mainModel } from '../../database/be_the_heroes';
totp.options = {
  step: 60 * 5,
};
class OTPController {
  async generateOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await mainModel.users.findOne({
        where: {
          email: _toString(email),
        },
      });
      if (!user) {
        return res.status(401).send({
          message: 'Email not found',
        });
      }

      const otp = totp.generate(_toString(email));
      await sendMail(
        _toString(email),
        generateFormEmail(otp, 'Verify Account')
      );

      const token = jwt.sign(
        {
          email,
          uid: user.uid,
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '5m',
        }
      );
      return res.status(200).send({
        message: `Sent OTP ${email} successfully`,
        data: {
          token,
        },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new OTPController();
