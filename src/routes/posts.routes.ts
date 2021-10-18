import { Router } from "express";

import CreatePostService from "../services/CreatePostService";
import GetPostService from "../services/GetPostService";
import DeletePostService from "../services/DeletePostService";

const postsRouter = Router()
let countPost
postsRouter.post('/', async (request, response) => {
  try {
    const { userId, text, imageId, groupId } = request.body;

    const createPost = new CreatePostService()

    const post = await createPost.execute({
      userId,
      text,
      imageId,
      groupId
    })
    countPost++
    return response.json(post)

  }catch (err){
    return response.status(400).json({ error: err.message });
  }
});
postsRouter.get('/by_group/:groupId', async (req, res)=> {
  try{
    const stringGroupId = req.params.groupId
    const groupId = +stringGroupId
    const getPost = new GetPostService();
    const post = await getPost.execute({groupId})

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
