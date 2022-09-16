import mongoose from "mongoose"

const { Schema ,model} = mongoose


const BlogSchem = new Schema({
    title: {
        type:String,
        require: true
    },
    auther: {
        type:String,
        require:true
    },
    content: {
        type: String,
        require:true
    },
    thumbnail: {
        data: {
            type: Buffer,
            require: true,
        },
        imageName: {
            type:String,
            require:true
        },
        contentType: String
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type:Date,
        default: new Date()
    }
})
export const Blog = model('blog',BlogSchem) 