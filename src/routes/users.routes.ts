import { Router } from "express";

import CreateUserService from "../services/CreateUserService";
import AuthenticateUserService from "../services/AuthenticateUserServicec";

const usersRouter = Router()

usersRouter.post('/authentication', async (request, response)=>{
  try{
    const {email, password} = request.body
    const authenticateUser = new AuthenticateUserService();
    const user = await authenticateUser.execute({
      email,
      password,
    })

    return response.json(user)

  }catch (err){
    console.log(request.body)
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user: User = await createUser.execute({
      name,
      email,
      password,
    });

    interface User {
      password?: string,
    }

    delete user.password


    return response.json(user);
  }catch (err){
    console.log(request.body)
    console.log(err);
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
