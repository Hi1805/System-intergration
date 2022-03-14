import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import _toString from 'lodash/toString';
import { v1 as uuidv1 } from 'uuid';
import { mainModel } from '../../database/be_the_heroes';
import {
  generateHashPassword,
  getPasswordByRequest,
} from '../../helpers/gernarate';
import moment from 'moment';
import { usersAttributes } from '../../database/be_the_heroes/models/users';
import { profilesAttributes } from '../../database/be_the_heroes/models/profiles';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { type } = <{ type: typeAuth }>req.query;
      const passwordSafe = getPasswordByRequest(req.body, type);
      const { password, uid, user_id, profile, level, role, is_reported } = <
        usersAttributes & { profile: profilesAttributes }
      >await mainModel.users.findOne({
        where: {
          email: _toString(email).trim(),
        },
        include: [
          {
            model: mainModel.profiles,
            as: 'profile',
          },
        ],
      }) || { password: undefined };

      if (!password) {
        return res.status(400).json({
          message: 'Email does not exist',
        });
      }
      const isValidPassword = await bcrypt.compare(passwordSafe, password);
      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Password is incorrect',
        });
      }
      const token = jwt.sign(
        {
          uid,
          email,
          user_id,
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '1d',
        }
      );
      return res.status(200).send({
        data: {
          token,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar: profile.avatar,
          uid: uid,
          level,
          role,
          is_reported,
          date_of_birth: profile.date_of_birth,
        },
        message: 'Login successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const {
        uid_gg,
        email,
        username,
        password,
        photo_url,
        first_name,
        last_name,
        date_of_birth,
      }: RequestAuth = req.body;
      const { type } = <{ type: typeAuth }>req.query;
      if (type === 'manual' && !password) {
        throw new Error('Password is required');
      }
      const password_hash = generateHashPassword(req.body, type);
      const user = await mainModel.users.findOne({
        where: {
          email: _toString(email).trim(),
        },
      });

      if (user) {
        return res.status(400).json({
          message: 'Email already exists',
        });
      }
      const user_info = await mainModel.users.create({
        uid_gg: _toString(uid_gg),
        uid: _toString(uuidv1()),
        email: _toString(email),
        username: _toString(username),
        role: 0,
        level: type === 'manual' ? 0 : 1,
        password: password_hash,
        status: 1,
        is_reported: 0,
        is_locked: 0,
        is_otp: 0,
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      });

      const user_profile = await mainModel.profiles.create({
        user_id: Number(user_info.user_id),
        first_name: _toString(first_name),
        last_name: _toString(last_name),
        date_of_birth: _toString(date_of_birth) || new Date().toDateString(),
        avatar: _toString(photo_url),
      });

      const token = jwt.sign(
        {
          uid: user_info.uid,
          email,
          user_id: user_info.user_id,
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '1d',
        }
      );
      return res.status(201).send({
        data: {
          token,
          first_name: user_profile.first_name,
          last_name: user_profile.last_name,
          email: user_info.email,
          uid: user_info.uid,
          level: user_info.level,
          avatar: user_profile.avatar,
        },
        message: 'Register successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new AuthController();
