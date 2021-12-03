import { Router } from "express";

import CreateGroupService from "../services/CreateGroupService";
import AlterGroupImageService from "../services/AlterGroupImageService";
import GetGroupsService from "../services/GetGroupsService";
import GetGroupService from "../services/GetGroupService";
import AlterGroupService from "../services/AlterGroupService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";



const groupsRouter = Router()

groupsRouter.use(ensureAuthenticated)

interface Group{
  creator: string,
  imageId?: number,
  description?: string,
  name: string,
  isPrivate: boolean
};
groupsRouter.post('/', async (req, res) =>{
  try{
    const { imageId, description, name, isPrivate }: Group = req.body;
    const creator = req.user.id
    const createGroup = new CreateGroupService()

    const group = await createGroup.execute({
      creator,
      imageId,
      description,
      name,
      isPrivate
    })

    return res.json(group)
  }catch(err){
    return res.status(400).json({ Error:err.message })
  }
})
groupsRouter.get('/Id/:id', async (req, res) => {
  try{
    const sid = req.params.id
    const id = +sid
    const getGroup = new GetGroupService()

    const groups = await getGroup.execute({ id })

    return res.json(groups);

  }catch(err){
    return res.status(400).json({error: err.message})
  }
})
groupsRouter.get('/by_userId/:userId', async (req, res) => {
  try{
    const userId = req.params.userId
    const getGroup = new GetGroupsService()

    const groups = await getGroup.execute({userId})

    return res.json(groups);

  }catch(err){
    return res.status(400).json({error: err.message})
  }
})


groupsRouter.put('/:groupId', async (req, res) => {
  try{
    const userId = req.user.id
    const groupId = req.params.groupId
    const id = +groupId
    const { imageId, description, name } = req.body
    const alterGroup = new AlterGroupService()
    const newGroup = await alterGroup.execute({ userId, id, imageId, description, name})
    return res.json(newGroup)
  }catch(err){
    return res.status(400).json({error: err.message})
  }
})

export default groupsRouter
