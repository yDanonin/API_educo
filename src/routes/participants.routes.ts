import { Router } from "express";

import CreateParticipantService from "../services/CreateParticipantService";

const participantsRouter = Router()

interface Participant{
  userId: string,
  groupId: number,
};
participantsRouter.post('/', async (req, res) =>{
  try{
    const { userId, groupId }: Participant = req.body;
    const createParticipant = new CreateParticipantService()

    const participant = await createParticipant.execute({
      userId,
      groupId,
    })

    return res.json(participant)
  }catch(err){
    return res.status(400).json({ Error:err.message })
  }
})

export default participantsRouter;
