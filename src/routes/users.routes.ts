import { response, Router } from "express";

import CreateUserService from "../services/CreateUserService";
import AlterAvatarService from "../services/AlterAvatarService";

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password


    return response.json(user);
  }catch (err){
    //console.log(request.body)
    //console.log(err);
    return response.status(400).json({ error: err.message });
  }
});
usersRouter.put('/avatar/:id', async (request, response) => {
  try{
    const { id }  = request.params
    const { avatar } = request.body
    const alterAvatar = new AlterAvatarService();
    const localAvatar = await alterAvatar.execute({id, avatar})

    return response.json({local: localAvatar.local})
  }catch (err){
    return response.status(400).json({ error: err.message });
  }
})


export default usersRouter;
