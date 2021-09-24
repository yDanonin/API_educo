import { Router } from "express";

import CreatePostService from "../services/CreatePostService";
import GetPostService from "../services/GetPostService";
import DeletePostService from "../services/DeletePostService";

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
postsRouter.get('/by_user/:userId', async (req, res)=> {
  try{
    const userId = req.params.userId
    const getPost = new GetPostService();
    const post = await getPost.execute({userId})

    res.json(post);
  }catch(err){
    res.status(400).json({error: err.message});
  }
})
postsRouter.delete('/:id', async (req, res) => {
  try{
    const stringId = req.params.id
    const id = +stringId
    const deletePost = new DeletePostService();

    const response = await deletePost.execute({id})

    res.json(response);
  }catch(err){
    res.status(400).json({error: err.message});
  }
})

export default postsRouter;
