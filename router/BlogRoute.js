import { Router } from "express";
import { AuthenTication } from "../middelware/Authentication.js";
import { blogsController } from "../controler/blogs.controller.js";
import { commentController } from "../controler/comment.controller.js";

export const blogRouter = Router()
/**
 * @route for blog releted oppratation
 */
blogRouter.get('/', blogsController.getAllBlogPost)
blogRouter.get('/blog/:id', blogsController.getBlogPost)
blogRouter.post('/blog/:username/create-post', AuthenTication, blogsController.createPost)
blogRouter.put('/blog/:id/update', AuthenTication, blogsController.updateBlogPost)
blogRouter.delete('/blog/:id/delete', AuthenTication, blogsController.deleteBlogPost)



/**
 * @route for comments and auther 
*/
blogRouter.get('/blog/:id/get-comments', commentController.getAllCommentOfBlog)
blogRouter.post('/blog/:id/add-comment', AuthenTication, commentController.addComment)
blogRouter.delete('/blog/:id/delete', AuthenTication, commentController.deleteComment)

