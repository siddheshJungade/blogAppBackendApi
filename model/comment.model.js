import mongoose from "mongoose";

const { Schema, model } = mongoose



const commentSchem = new Schema({
    comment: {
        type: String
    },
    auther: {
        type: String
    },
    blogId: {
        type: String
    },
})


export const Comment = model('comment',commentSchem)