import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import AuthenticateUserService from "../services/AuthenticateUserServicec";
import GetUserService from "../services/GetUserService";

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

    return response.json( token )
  }catch (err){
    //console.log(request.body)
    //console.log(err);
    return response.status(400).json({ error: err.message });
  }
})

sessionsRouter.use(ensureAuthenticated);

sessionsRouter.get('/', async (request, response) => {
  try{
    const userService = new GetUserService()
    const id = request.user.id
    const user = await userService.execute({id: id})
    return response.json(user)
  }
  catch(err){
    return response.status(400).json({error: err.message});
  }
})

export default sessionsRouter;
