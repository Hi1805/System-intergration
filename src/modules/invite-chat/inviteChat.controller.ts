import { Request, Response } from 'express';
import { toString } from 'lodash';
import { mainModel } from '../../database/be_the_heroes';
class InviteChatController {
  async getInfoChatGroup(req: Request, res: Response) {
    try {
      const { chat_id } = req.query;

      const infoGroup = await mainModel.config_chat_group.findOne({
        where: {
          id: toString(chat_id),
        },
        raw: true,
      });

      if (!infoGroup) {
        return res.status(400).json({
          message: 'group chat is not found',
        });
      }
      const total_member = await mainModel.chat_groups.count({
        where: {
          group_chat_id: toString(chat_id),
        },
      });
      return res.status(200).json({
        message: '',
        data: { ...infoGroup, total_member },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async getStatusUser(req: Request, res: Response) {
    try {
      const { uid } = req.session;
      const { chat_id } = req.query;

      const infoUser = await mainModel.chat_groups.findOne({
        where: {
          member_uid: uid,
          group_chat_id: toString(chat_id),
        },
      });
      if (!infoUser) {
        return res.status(200).json({
          message: 'You are not member of this group',
          data: {
            isMember: false,
          },
        });
      }
      return res.status(200).json({
        message: '',
        data: {
          isMember: true,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
  async joinGroupChat(req: Request, res: Response) {
    try {
      const { uid } = req.session;
      const { chat_id } = req.body;
      const isMemberGroup = await mainModel.config_chat_group.findOne({
        where: {
          id: toString(chat_id),
        },
      });
      if (!isMemberGroup) {
        return res.status(400).json({
          message: 'group chat is not found',
          data: {
            isMember: false,
          },
        });
      }

      const infoChat = await mainModel.chat_groups.findOrCreate({
        where: {
          group_chat_id: toString(chat_id),
          member_uid: uid,
        },
        defaults: {
          group_chat_id: toString(chat_id),
          member_uid: uid,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return res.status(200).json({
        message: '',
        data: {
          ...infoChat[0],
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

export default new InviteChatController();
