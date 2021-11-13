import { Router } from "express";

import CreateParticipantService from "../services/CreateParticipantService";
import GetParticipantsService from "../services/GetParticipantsService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const participantsRouter = Router()

participantsRouter.use(ensureAuthenticated)

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
    return res.status(400).json({ Error: err.message })
  }
})

participantsRouter.get('/:groupId', async (req, res) => {
  try{
    const stringGroupId  = req.params.groupId
    const groupId = +stringGroupId
    const getParticipant = new GetParticipantsService()

    const participants = await getParticipant.execute({ groupId });

    return res.json(participants)
  }catch(err){
    return res.status(400).json({ error: err.message })
  }
})

export default participantsRouter;
