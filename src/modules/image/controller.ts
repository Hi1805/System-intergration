import { Request, Response } from 'express';
import { spaces } from '../../database/spaces';
import { v1 as uuidv1 } from 'uuid';

class ImageController {
  async getUrlImage(req: Request, res: Response) {
    try {
      const { files } = <{ files: Express.Multer.File[] }>req;
      if (!files?.length) {
        return res.status(400).json({ message: 'File is not found' });
      }
      const promiseFile = files.map((file, index) => {
        const spaceParams = {
          Bucket: process.env.SPACES_BUCKET || '',
          Key: `${new Date().getTime() + index}.${
            file.originalname.split('.')[1]
          }`,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: 'image/*',
        };
        return spaces
          ?.upload(spaceParams)
          .promise()
          .then((res) => res.Location);
      });

      const urls = await Promise.all(promiseFile);
      return res.status(200).json({ urls });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        message: 'Internal server error',
      });
    }
  }
}
export default new ImageController();
