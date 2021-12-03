import { Router } from "express";

import CreateFollowerService from "../services/CreateFollowerService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";


const followersRouter = Router()

followersRouter.use(ensureAuthenticated)

followersRouter.post('/', async (req, res) =>{
  try{
    const follower = req.user.id
    const followed = req.body.followed
    const createFollower = new CreateFollowerService()
    const followers = await createFollower.execute({
      follower,
      followed
    })
    return res.json(followers)
  }
  catch(err){
    return res.status(400).json({ error: err.message })
  }
})

export default followersRouter
