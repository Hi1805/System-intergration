import { Request, Response } from 'express';
import { totp } from 'otplib';
import { generateFormEmail } from '../../helpers/gernarate';
import { sendMail } from '../../helpers/send';
class OTPController {
  async generateOtp(req: Request, res: Response) {
    try {
      const { email } = req.session;
      console.log('run render otp');
      totp.options = {
        step: 60 * 5,
      };
      const otp = totp.generate(email);
      await sendMail(email, generateFormEmail(otp, 'Verify Account'));
      return res.status(200).send({
        message: `Sent OTP ${email} successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new OTPController();
