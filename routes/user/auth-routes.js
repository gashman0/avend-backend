import express from "express";
import { protectUser } from "../../middleware/ProtectUser.js";
import { signup } from "../../controllers/user-auth/signup-controller.js";
import { login } from "../../controllers/user-auth/login-controller.js";
import { refresh } from "../../controllers/user-auth/refresh-controller.js";
import { logout } from "../../controllers/user-auth/logout-controller.js";
import { getMe } from "../../controllers/user/me.js";


const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);


authRouter.get('/me',protectUser, getMe)



export default authRouter;