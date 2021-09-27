import { Router } from "express";

import CreateGroupService from "../services/CreateGroupService";
import GetGroupsService from "../services/GetGroupsService";

const groupsRouter = Router()

interface Group{
  creator: string,
  imageId: number,
  description: string,
  nome: string,
};
groupsRouter.post('/', async (req, res) =>{
  try{
    const { creator, imageId, description, nome }: Group = req.body;
    const createGroup = new CreateGroupService()

    const group = await createGroup.execute({
      creator,
      imageId,
      description,
      nome,
    })

    return res.json("Grupo criado com sucesso.")
  }catch(err){
    return res.status(400).json({ Error:err.message })
  }
})
groupsRouter.get('/:userId', async (req, res) => {
  try{
    const userId = req.params.userId
    const getGroup = new GetGroupsService()

    const groups = await getGroup.execute({userId})

    return res.json(groups);

  }catch(err){
    return res.status(400).json({error: err.message})
  }
})

export default groupsRouter
