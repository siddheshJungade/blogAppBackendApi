import { User } from "../model/user.model.js"
import bcrypt from 'bcrypt'
import { Strategy } from "passport-google-oauth20"


export const userController = {}

userController.setRegisterUser = async (req, res) => {
    try {
        const { username, email, password, conformPassword } = req.body
        if (!username || !email || !password || !conformPassword)
            return res.status(422).json({ error: "please provide proper input" })
        if (password !== conformPassword)
            return res.status(422).json({ error: "passowrd missmatch" })

        const userExisist = await User.findOne({ email: email })
        if (userExisist)
            return res.status(422).json({ error: "user exisist" })

        const user = new User({ username, email, password })
        await user.save()
        res.status(201).json({ message: "user registered" })
    } catch (err) {
        res.status(400).json({ errot: err })
    }
}

userController.loginValidation = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ error: "please provide proper input" })
        const userExisist = await User.findOne({ email })
        if (!userExisist) {
            return res.status(400).json({ error: "invalaid credential" })
        }
        const isMatch = bcrypt.compare(password, userExisist.password)
        if (!isMatch) {
            res.status(400).json({ error: "invalaid credential" })
        }
        const token = await userExisist.generateAuthToken()
        console.log(token)
        res.cookie('acess_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }).status(201).json({ message: "user login" })
    } catch (err) {
        res.status(400).json({ error: "invalaid credential catch" })
    }
}




/**
 * midelware for google auth
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


userController.getGoogleLogin = (req, res) => {
    return new Strategy({
        callbackURL: 'http://localhost:5000/auth/google/callback',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done, req, res) => {
        const email = profile._json.email
        let userExisist = await User.findOne({ email })
        console.log(userExisist)
        if (!userExisist) {
            console.log(email)
            const user = new User({
                username: email,
                email: email
            })
            userExisist = user
        }
        console.log(userExisist)
        const token = await userExisist.generateAuthToken()
        done(null, token)
    })
}


userController.setFollowPerson = async (req, res) => {
    try {
        const user = res.user
        const followToPerson = await User.findById(req.body.followToPersonId)
        if (!followToPerson) {
            res.status(200).json({ message: "no user id" })
        }
        const isFollowing = await User.find({ "$and": [{ "_id": user._id }, { "following": { $elemMatch: { userid: followToPerson._id } } }] })
        if(!isFollowing){
            throw new Error("no previous following")
        }
        await followToPerson.updateFollower(user._id)
        await user.updateFollowing(followToPerson._id)
        res.status(200).json({ message: "yo are following person" })
    } catch (err) {
        console.log(err)
    }
}