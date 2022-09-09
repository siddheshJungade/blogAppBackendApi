import { Router } from "express";
import { userController } from "../controler/users.controller.js";
import { passport } from "../middelware/Authentication.js";
import session from "express-session";

export const authRout = Router()

authRout.use(passport.initialize())
authRout.use(session({ secret: 'melody hensley is my spirit animal'}));

authRout.post("/register", userController.setRegisterUser)
authRout.post("/login", userController.loginValidation)
authRout.get("/google", passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))
authRout.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error'}),(req, res) => {
    res.cookie('asess_token', req.user.token);
    res.redirect('/sucess');
});