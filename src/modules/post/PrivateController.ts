import { Request, Response } from 'express';
class PrivatePostController {
  async createPost(req: Request, res: Response) {
    try {
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({});
    }
  }
}

export default new PrivatePostController();
