import express from 'express';
import {
  getMyAccount,
  loginToAccount,
  registerAccount,
  updateAccountDetails,
  updateAccountPassword,
} from '../controllers/authController.mjs';
import {
  authorizedAccess,
  protectedAccess,
} from '../middlewares/authorization.mjs';

const authRouter = express.Router();

authRouter.route('/register').post(registerAccount);
authRouter.route('/login').post(loginToAccount);

authRouter.use(protectedAccess);

authRouter.route('/me').get(getMyAccount);
authRouter.route('/edit/details').put(updateAccountDetails);
authRouter.route('/edit/password').put(updateAccountPassword);

export default authRouter;
