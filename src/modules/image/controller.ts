import { Request, Response } from 'express';
import { spaces } from '../../database/spaces';
import { v1 as uuidv1 } from 'uuid';

class ImageController {
  async getUrlImage(req: Request, res: Response) {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: 'File is not found' });
      }
      const spaceParams = {
        Bucket: process.env.SPACES_BUCKET || '',
        Key: `${uuidv1()}.${req.file?.originalname.split('.')[1]}`,
        Body: req.file?.buffer,
        ACL: 'public-read',
        ContentType: 'image/*',
      };

      const url = await spaces
        ?.upload(spaceParams)
        .promise()
        .then((res) => res.Location);
      console.log(url);

      return res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new ImageController();
