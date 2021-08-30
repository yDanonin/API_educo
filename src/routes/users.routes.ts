import { Router } from "express";

import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router()

usersRouter.use(ensureAuthenticated)
usersRouter.get('/id', async (request, response) => {

  console.log(request.user)
  return response.json(request.user)
})


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

export default usersRouter;
