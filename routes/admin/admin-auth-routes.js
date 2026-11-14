import express from "express";
import { protectAdmin } from "../../middleware/ProtectAdmin.js";
import { adminLogin } from "../../controllers/admin-auth/admin-login-controller.js";
import { adminRefresh } from "../../controllers/admin-auth/admin-reshresh-controller.js";
import { adminLogout } from "../../controllers/admin-auth/admin-logout-controller.js";
import { getAdmin } from "../../controllers/admin-auth/admin.js";


const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', adminLogin);
adminAuthRouter.post('/refresh', adminRefresh);
adminAuthRouter.post('/logout', adminLogout);

adminAuthRouter.get('/me', protectAdmin, getAdmin);


export default adminAuthRouter;