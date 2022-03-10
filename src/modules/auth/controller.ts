import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
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
      const { access_token } = req.query;
      const test = await mainModel.users.findAll();
      return res.status(200).json(test);
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new AuthController();
