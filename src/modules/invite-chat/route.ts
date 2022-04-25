import express from 'express';
import InviteController from './inviteChat.controller';
const inviteRoute = express.Router();

inviteRoute.post('/invite/join', InviteController.joinGroupChat);
inviteRoute.get('/invite/info', InviteController.getInfoChatGroup);
inviteRoute.get('/invite/status', InviteController.getStatusUser);
export { inviteRoute };
