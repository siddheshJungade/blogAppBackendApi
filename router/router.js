import { Router } from "express";
import { authRout } from "./authRoute.js";
import { blogRouter } from "./BlogRoute.js";
import { userRouter } from "./userRouter.js";
const router = Router()



router.use("/",(req,res) => {
    return res.json({message: `api working sucessfully`})
})
router.use("/auth",authRout)
router.use("/blogs",blogRouter)
router.use("/users",userRouter)


export default router;