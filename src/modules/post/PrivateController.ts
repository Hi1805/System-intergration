import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import _toString from 'lodash/toString';
import { generatePhotoUrl } from '../../helpers/gernarate';
import { AVATAR_DEFAULT } from '../auth';
import { postsAttributes } from '../../database/be_the_heroes/models/posts';

class PrivatePostController {
  async createPost(req: Request, res: Response) {
    try {
      const { files } = req;
      const photos_url = await generatePhotoUrl(
        (files as Express.Multer.File[]) || []
      );
      const { uid, avatar, first_name, last_name } = req.session;
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
        status: 'active',
        join_url: _toString(join_url),
        residential_address: _toString(residential_address),
        content: _toString(content),
        ward: _toString(ward),
        is_edited: 0,
        photos: photos_url.join(','),
        avatar: _toString(avatar) || AVATAR_DEFAULT,
        fullname: _toString(first_name) + ' ' + _toString(last_name),
        updated_at: new Date(),
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

  async deletePost(req: Request, res: Response) {
    try {
      const { post_id } = req.body;
      const { uid } = req.session;
      if (!post_id) {
        return res.status(400).json({
          message: 'Post id is required',
        });
      }
      const comments = await mainModel.comments.findAll({
        where: {
          post_id: Number(post_id),
        },
      });
      await Promise.all(
        comments.map(async (comment) => {
          await comment.destroy();
        })
      );
      await mainModel.posts.destroy({
        where: {
          post_id: Number(post_id),
          uid: uid,
        },
      });

      return res.status(200).send({
        message: `Post ${post_id} deleted successfully`,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
  async editPost(req: Request, res: Response) {
    try {
      const { post_id } = req.body as postsAttributes;

      const { uid } = req.session;
      if (!post_id) {
        return res.status(400).json({
          message: 'Post id is required',
        });
      }
      await mainModel.posts.update(
        {
          ...req.body,
        },
        {
          where: {
            post_id: Number(post_id),
            uid: uid,
          },
        }
      );
      return res.status(200).send({
        message: `Post ${post_id} deleted successfully`,
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
