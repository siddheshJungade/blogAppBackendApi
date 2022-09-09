
import { Router } from "express";
import { userController } from "../controler/users.controller.js";
import { AuthenTication } from "../middelware/Authentication.js";
export const userRouter = Router()


userRouter.post('/:userid/following',AuthenTication,userController.setFollowPerson)