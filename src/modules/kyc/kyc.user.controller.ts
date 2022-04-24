import { kyc_personalAttributes } from './../../database/be_the_heroes/models/kyc_personal';
import { Request, Response } from 'express';
import { mainModel } from '../../database/be_the_heroes';
import { Op } from 'sequelize';
class KYCUserController {
  async submitForm(req: Request, res: Response) {
    try {
      const { uid } = req.session;

      const isPending = await mainModel.kyc_personal.findOne({
        where: {
          uid,
          status: {
            [Op.in]: ['pending', 'verified'],
          },
        },
      });

      if (isPending) {
        return res.status(400).json({
          message: 'You have already submitted a form',
        });
      }

      const kycs = await mainModel.kyc_personal.create({
        ...(req.body as kyc_personalAttributes),

        uid,
        status: 'pending',
      });

      return res.status(200).json({
        message: 'Success',
        data: kycs,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async getStatusKYC(req: Request, res: Response) {
    try {
      const { uid } = req.session;

      const kyc = await mainModel.kyc_personal.findOne({
        where: {
          uid,
        },
        order: [['id', 'DESC']],
      });

      if (!kyc) {
        return res.status(200).json({
          message: 'You have not submitted a form',
          data: {
            status: 'unsent',
          },
        });
      }

      return res.status(200).json({
        message: 'Success',
        data: kyc,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

export default new KYCUserController();
