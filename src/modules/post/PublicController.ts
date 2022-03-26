import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';

class PublicController {
  async getAllPost(req: Request, res: Response) {
    try {
      const { page, size } = req.query;
      const posts = await mainModel.posts.findAll({});
    } catch (error) {}
  }
}

export default new PublicController();
