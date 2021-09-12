import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AuthenticateUserService from "../services/AuthenticateUserServicec";

const sessionsRouter = Router()


sessionsRouter.post('/', async (request, response)=>{
  try{
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService

    const { user ,token } = await authenticateUser.execute({
      email,
      password,
    })


    delete user.password

    return response.json({ token })
  }catch (err){
    //console.log(request.body)
    //console.log(err);
    return response.status(400).json({ error: err.message });
  }
})

sessionsRouter.use(ensureAuthenticated);

sessionsRouter.get('/id', async (request, response) => {

  console.log(request.user)
  return response.json(request.user)
})

export default sessionsRouter;
