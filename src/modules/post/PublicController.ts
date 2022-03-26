import _toString from 'lodash/toString';
import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import _toNumber from 'lodash/toNumber';
class PublicController {
  async getAllPost(req: Request, res: Response) {
    try {
      const { page, size } = req.query;
      let offset = (_toNumber(page) - 1) * _toNumber(size);

      const posts = await mainModel.posts.findAndCountAll({
        offset: offset,
        limit: size ? _toNumber(size) : 1,
        raw: true,
        order: [['updated_at', 'DESC']],
      });

      return res.status(200).send({
        data: {
          list: posts.rows.map((item) => ({
            ...item,
            photos:
              item.photos && item.photos.trim() ? item.photos.split(',') : [],
          })),
          total: posts.count,
        },
        message: 'Get all post successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
  async getAllOfUserPost(req: Request, res: Response) {
    try {
      const { page, size, uid } = req.query;
      if (!uid) {
        throw new Error('uid is required');
      }
      let offset = (_toNumber(page) - 1) * _toNumber(size);

      const posts = await mainModel.posts.findAndCountAll({
        where: {
          uid: _toString(uid),
        },
        offset: offset,
        limit: size ? _toNumber(size) : 1,
        raw: true,
        order: [['updated_at', 'DESC']],
      });

      return res.status(200).send({
        data: {
          list: posts.rows.map((item) => ({
            ...item,
            photos:
              item.photos && item.photos.trim() ? item.photos.split(',') : [],
          })),
          total: posts.count,
        },
        message: 'Get all post successfully',
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
