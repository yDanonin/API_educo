import { Router } from "express";

import CreateUserService from "../services/CreateUserService";
import AlterAvatarService from "../services/AlterAvatarService";
import GetUserService from "../services/GetUserService";
import DeleteUserService from "../services/DeleteUserService";

const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password


    return res.json(user);
  }catch (err){
    //console.log(request.body)
    //console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.get('/by_id/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const getUser = new GetUserService();
    const user = await getUser.execute({id});

    return res.json(user);
  }
  catch(err){
    return res.status(400).json({ error: err.message });
  }
})

usersRouter.put('/avatar/:id', async (req, res) => {
  try{
    const { id }  = req.params
    const { avatar } = req.body
    const alterAvatar = new AlterAvatarService();
    const localAvatar = await alterAvatar.execute({id, avatar})

    return res.json({local: localAvatar.local})
  }catch (err){
    return res.status(400).json({ error: err.message });
  }
})
usersRouter.delete('/:id', async (req, res) =>{
  try{
    const { id } = req.params;
    const deleteUser = new DeleteUserService()

    const user = await deleteUser.execute({id})

    res.json(user);
  }catch(err){
    return res.status(400).json({error: err.message});
  }
})


export default usersRouter;
