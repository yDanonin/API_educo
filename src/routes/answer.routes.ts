import { Router } from "express";

import CreateAnswerService from "../services/CreateAnswerService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";


const answerRouter = Router()

answerRouter.use(ensureAuthenticated)

answerRouter.post('/', async (req, res) =>{
  try{
    const { answerId, postId } = req.body
    const createAnswer = new CreateAnswerService()
    const answer = await createAnswer.execute({
      answerId,
      postId
    })
    return res.json(answer)
  }
  catch(err){
    return res.status(400).json({ error: err.message })
  }
})

export default answerRouter
