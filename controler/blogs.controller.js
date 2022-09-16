import { Blog } from "../model/blog.model.js"

export const blogsController = {
    createPost: async (req, res) => {
        try {
            const file = req.files.file
            const { title, content } = JSON.parse(req.body.blog)
            const auther = req.params.username
            if (!title || !auther || !content) {
                res.status(400).json({ error: "filed contain properly plz" })
            }
            if (res.userName !== auther)
                throw new Error("unauthorize user")
            const blogpost = new Blog({ title, content, auther })
            blogpost.thumbnail.data = file.data,
                blogpost.thumbnail.contentType = file.mimtype
            blogpost.thumbnail.imageName = file.name
            await blogpost.save()
            res.status(200).json({ message: "new blog added" })
        } catch (e) {
            res.status(400).json({ error: "somthing went Wrong" })
            console.log(e)
        }
    },

    getBlogPost: (req, res) => {
        try {
            Blog.findById(req.params.id, (err, result) => {
                if (err)
                    throw new Error("somthing went wrong")
                res.status(200).json(result)
            })
        } catch (e) {
            res.status(500).json({ error: "server site error" }).send()
            console.log(e)
        }
    },

    getAllBlogPost: (req, res) => {
        try {
            Blog.find((err, result) => {
                if (err)
                    throw new Error("somthing went wrong")
                console.log(result)
                res.status(200).json(result)
            })
        } catch (e) {
            res.status(500).json({ error: "server site error" }).send()
            console.log(e)
        }
    },

    updateBlogPost: (req, res) => {
        try {
            const file = req.files.file
            const { title, content, auther } = JSON.parse(req.body.blog)

            if (!title || !auther || !content) {
                res.status(400).json({ error: "filed contain properly plz" })
            }
            let thumbnail = {
                data: file.data,
                contentType: file.mimtype,
                imageName: file.name
            }

            if (res.userName !== auther)
                throw new Error("unauthorize user")
            Blog.findByIdAndUpdate(req.params.id,
                {
                    title: title,
                    auther: auther,
                    content: content,
                    thumbnail: thumbnail
                })
            res.status(200).json({ message: "blogupdated" })
        } catch (e) {
            res.status(400).json({ error: "unauthorize acess" })
            console.log(e)
        }
    },

    deleteBlogPost: (req, res) => {
        try {
            const auther = req.body.auther
            if (res.userName !== auther)
                throw new Error("unauthorize user")
            Blog.findByIdAndDelete(req.params.id.trim(),(err,result) => {
                if(err) console.log(err)
            })
            res.status(200).json({ message: "blog deleted" })
        } catch (e) {
            res.status(400).json({ error: "unauthorize acess" })
            console.log(e)
        }
    }
}



