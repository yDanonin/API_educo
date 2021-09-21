import { Router } from "express";

import CreatePostService from "../services/CreatePostService";

const postsRouter = Router()

postsRouter.post('/', async (request, response) => {
  try {
    const { userId, text, imageId } = request.body;

    const createPost = new CreatePostService()

    const post = await createPost.execute({
      userId,
      text,
      imageId
    })

    return response.json(post)

  }catch (err){
    //console.log(request.body)
    //console.log(err);
    return response.status(400).json({ error: err.message });
  }
});


export default postsRouter;
