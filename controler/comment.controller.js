
import { Comment } from "../model/comment.model.js"


export const commentController = {
    getAllCommentOfBlog: (req, res) => {
        try {
            Comment.findMany({ 'blogId': req.params.id }, (err, result) => {
                res.status(200).json(result)
            })
        } catch (e) {
            console.log(e)
        }
    },
    addComment: (req, res) => {
        const { auther, comment } = req.body
        const blogId = req.params.id

        if (!author || !comment || !blogId) {
            return res.status(400).json({ error: "please provide proper input" })
        }
        const commentObj = new Comment({ auther, comment, blogId })
        commentObj.save()
        res.status(200).json({ message: "commnet added" })
    },
    deleteComment: (req, res) => {
        if (req.userName !== req.body.auther) {
            throw new Error("unauthorize user")
        }
        try {
            Comment.findByIdAndDelete(req.body.id)
        } catch (err) {
            res.status(400).json({ errot: err })
            console.log(err)
        }
    }
}