import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import _toString from 'lodash/toString';
import { generatePhotoUrl } from '../../helpers/gernarate';
class PrivatePostController {
  async createPost(req: Request, res: Response) {
    try {
      const { files } = req;

      const photos_url = await generatePhotoUrl(
        (files as Express.Multer.File[]) || []
      );
      const { uid } = req.session;
      console.log(req.session);

      if (!uid) {
        console.log('uid not found');
      }
      const {
        title,
        province,
        district,
        residential_address,
        content,
        join_url,
        ward,
      } = req.body;

      const posts = await mainModel.posts.create({
        district: _toString(district),
        uid: uid,
        title: _toString(title),
        province: _toString(province),
        type: 'post',
        status: 'oke',
        join_url: _toString(join_url),
        residential_address: _toString(residential_address),
        content: _toString(content),
        ward: _toString(ward),
        is_edited: 0,
        photos: photos_url.join(','),
      });
      return res.status(200).send({
        data: posts.toJSON(),
        message: 'Create post successfully',
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

export default new PrivatePostController();
