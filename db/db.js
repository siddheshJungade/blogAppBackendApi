import mongoose from "mongoose"


export const db = () => {
    console.log(process.env.DB)
    mongoose.connect(process.env.DB).then(() => {console.log("connection sucessfull")}).catch((err)=> console.log(err))
    return mongoose.connection;
}