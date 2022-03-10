import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import _toString from 'lodash/toString';
import { v1 as uuidv1 } from 'uuid';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      return res.send('loginWithGoogle');
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { uid_gg, email, username } = req.query;
      const user = await mainModel.users.findOne({
        where: {
          uid_gg: _toString(uid_gg),
        },
      });

      if (user) {
        return res.status(400).json({
          message: 'User already exists',
        });
      }
      const user_info = await mainModel.users.create({
        uid_gg: _toString(uid_gg),
        uid: _toString(uuidv1()),
        email: _toString(email),
        username: _toString(username),
        role: 'user',
        level: 1,
        password: _toString(username + uuidv1()),
        status: 1,
        is_reported: 0,
        is_locked: 0,
        is_otp: 0,
      });
      return res.status(200).json(user_info);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new AuthController();
