import { response, Router } from "express";

import CreateUserService from "../services/CreateUserService";
import AlterUserService from "../services/AlterUserService";

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
usersRouter.put('/:id', async (request, response) => {
  try{
    const { id }  = request.params
    const { avatar } = request.body
    const alterUser = new AlterUserService();
    const user = await alterUser.execute({id, avatar})

    return response.json(user)
  }catch (err){
    return response.status(400).json({ error: err.message });
  }
})

export default usersRouter;
