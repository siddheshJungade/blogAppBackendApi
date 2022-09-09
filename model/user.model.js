import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken"

const { Schema, model } = mongoose


const userSchem = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
        },
        tokens: [
            {
                token: {
                    type: String,
                }
            }
        ],
        likedBlog: [
            {
                blogid: {
                    type: String,
                }
            }
        ],
        following: [
            {
                userid: {
                    type: String,
                }
            }
        ],
        followers: [
            {
                userid: {
                    type: String,
                }

            }
        ]
    }
)

userSchem.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchem.methods.generateAuthToken = function () {
    try {
        const token = jsonwebtoken.sign({ _id: this._id }, process.env.SCREATKEY)
        this.tokens = this.tokens.concat({ token })
        this.save();
        return token
    }
    catch (err) {
        console.log('err')
    }
}

userSchem.methods.updateFollowing = async function (userid) {
    try {
        this.following = await this.following.concat({ userid })
        await this.save()
    } catch (err) {
        console.log(err)
    }
}

userSchem.methods.updateFollower = async function (userid) {
    try {
        console.log(userid)
        this.followers = await this.followers.concat({ userid })
        await this.save()
    } catch (err) {
        console.log(err)
    }
}

export const User = model('USER', userSchem)


