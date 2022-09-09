
import jsonwebtoken from "jsonwebtoken"
import { User } from '../model/user.model.js'
import passport from "passport"
import 'dotenv/config'
import { userController } from "../controler/users.controller.js"

export const AuthenTication = async (req, res, next) => {
    try {
        const token = req.cookies.acess_token
        const verifyToken = jsonwebtoken.verify(token, process.env.SCREATKEY)
        const rootuser = await User.findOne({ _id: verifyToken._id, tokens: { $elemMatch: { token: token } } });
        if (!rootuser) {
            throw new Error("Usr not exist")
        }
        res.userName = rootuser.username;
        res.user = rootuser
        next();
    }
    catch(e) {
        res.status(400).json({ error: "unautarize acess occers" }).send()
        console.log(e)
    }
}




passport.use(await userController.getGoogleLogin())

passport.serializeUser((user, done) => {
    if (user) return done(null, user)
    else return done(null, false)
}),
passport.deserializeUser((id, done) => {
        if (user) return done(null, user)
        else return done(null, false)
})

export { passport };
