import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import _toString from 'lodash/toString';
import { v1 as uuidv1 } from 'uuid';
import { mainModel } from '../../database/be_the_heroes';
import { profilesAttributes } from '../../database/be_the_heroes/models/profiles';
import { usersAttributes } from '../../database/be_the_heroes/models/users';
import { firebaseAuth } from '../../database/firebase';

export const AVATAR_DEFAULT =
  'https://www.acumarketing.com/acupuncture-websites/wp-content/uploads/2020/01/anonymous-avatar-sm.jpg';
class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, accessToken, password: passwordRequest } = req.body;
      const { type } = <{ type: typeAuth }>req.query;

      const user = <usersAttributes & { profile: profilesAttributes }>(
        await mainModel.users.findOne({
          where: {
            email: _toString(email).trim(),
          },
          include: [
            {
              model: mainModel.profiles,
              as: 'profile',
            },
          ],
          // raw: true,
        })
      )?.toJSON() || { password: undefined };

      if (!user.password) {
        return res.status(400).json({
          message: 'Account does not exist',
        });
      }
      if (type != 'manual') {
        try {
          await firebaseAuth().verifyIdToken(accessToken);
        } catch (error) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }
      } else {
        const isValidPassword = await bcrypt.compare(
          passwordRequest,
          user.password
        );
        if (!isValidPassword) {
          return res.status(400).json({
            message: 'Password is incorrect',
          });
        }
      }

      const token = jwt.sign(
        {
          ...user,
          ...user.profile,
        },
        process.env.SECRET_KEY || ''
      );
      const { profile } = user;

      return res.status(200).json({
        data: {
          token,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar: profile.avatar,
          uid: user.uid,
          level: user.level,
          role: user.role,
          is_reported: user.is_reported,
          date_of_birth: profile.date_of_birth,
          email,
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
        emailVerified,
      }: RequestAuth = req.body;
      const { type } = <{ type: typeAuth }>req.query;
      if (type === 'manual' && !password) {
        return res.status(400).json({
          message: 'Password is required',
        });
      }
      const password_hash = bcrypt.hashSync(_toString(password), 10);
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
        level: type === 'manual' ? 1 : emailVerified ? 2 : 1,
        password: password_hash,
        status: 1,
        is_reported: 0,
        is_locked: 0,
        is_otp: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const user_profile = await mainModel.profiles.create({
        user_id: Number(user_info.user_id),
        first_name: _toString(first_name),
        last_name: _toString(last_name),
        date_of_birth: _toString(date_of_birth) || new Date().toDateString(),
        avatar: _toString(photo_url) || AVATAR_DEFAULT,
      });
      const token = jwt.sign(
        {
          ...user_info.toJSON(),
          ...user_profile,
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
        message: error.message,
      });
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const { email } = req.session;
      const { newPassword } = req.body;
      const user = await mainModel.users.findOne({
        where: {
          email: _toString(email).trim(),
        },
      });
      if (!user) {
        return res.status(400).json({
          message: 'Account does not exist',
        });
      }

      const newPassWordHash = await bcrypt.hashSync(_toString(newPassword), 10);
      await mainModel.users.update(
        {
          password: newPassWordHash,
        },
        {
          where: {
            email: _toString(email).trim(),
          },
        }
      );
      return res.status(200).send({
        message: `Reset Password Successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
  async getSession(req: Request, res: Response) {
    try {
      const { uid, email } = req.session;
      const user = <usersAttributes & { profile: profilesAttributes }>(
        await mainModel.users
          .findOne({
            where: {
              uid,
              email,
            },
            include: [
              {
                model: mainModel.profiles,
                as: 'profile',
              },
            ],
          })
          .then((res) => res?.toJSON())
      );

      if (!user) {
        return res.status(401).json({
          message: 'Invalid session',
        });
      }

      const token = jwt.sign(
        {
          ...user,
          avatar: user.profile.avatar,
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: '1d',
        }
      );
      return res.status(200).json({
        data: {
          token,
          uid: user.uid,
          email: user.email,
          user_id: user.user_id,
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
          avatar: user.profile.avatar,
          level: user.level,
          role: user.role,
          is_reported: user.is_reported,
          date_of_birth: user.profile.date_of_birth,
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
}
export default new AuthController();
