import _toString from 'lodash/toString';
import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import _toNumber from 'lodash/toNumber';
import { profilesAttributes } from '../../database/be_the_heroes/models/profiles';
import { usersAttributes } from '../../database/be_the_heroes/models/users';
class PublicController {
  async getProfile(req: Request, res: Response) {
    try {
      const { uid } = req.params;
      if (!uid) {
        return res.status(400).json({
          message: 'User id is required',
        });
      }
      const user = <usersAttributes & { profiles: profilesAttributes }>(
        await mainModel.users.findOne({
          where: {
            uid,
          },
          include: [
            {
              model: mainModel.profiles,
              as: 'profiles',
            },
          ],
        })
      )?.toJSON();

      return res.status(200).json({
        data: {
          ...user.profiles[0],
        },
        message: 'Get profile successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

export default new PublicController();
