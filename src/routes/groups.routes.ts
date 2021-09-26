import { Router } from "express";

import CreateGroupService from "../services/CreateGroupService";

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

    return res.json(group)
  }catch(err){
    return res.status(400).json({ Error:err.message })
  }
})

export default groupsRouter
