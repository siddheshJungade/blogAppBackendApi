
import { Router } from "express";
import { userController } from "../controler/users.controller.js";
import { AuthenTication } from "../middelware/Authentication.js";
export const userRouter = Router()


userRouter.post('/:userid/follow',AuthenTication,userController.setAddFollowPerson)
userRouter.delete('/:userid/unfollow',AuthenTication,userController.setRemoveFollowPerson)