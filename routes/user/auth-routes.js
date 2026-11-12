import express from "express";
import { signup } from "../../controllers/user-auth/signup-controller.js";


const authRouter = express.Router();

authRouter.post('/signup', signup);

export default authRouter;