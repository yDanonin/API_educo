import { Router } from "express";

import CreateImageService from "../services/CreateImageService";
import GetImageService from "../services/GetImageService";

const imagesRouter = Router()

imagesRouter.post('/', async (request, response) => {
  try{
    const { userId, nome, local } = request.body
    const createImage = new CreateImageService();
    const images = await createImage.execute({
      userId,
      nome,
      local,
    })

    return response.json(images)
  }catch (err){

    return response.status(400).json({ error: err.message });
  }

});


imagesRouter.get('/by_id/:id', async (req, res) => {
  try{
    const StringId  = req.params.id;
    const id = +StringId
    const getImage = new GetImageService()

    const image = await getImage.execute({id})
    return res.json(image);
  }
  catch(err){

    return res.status(400).json({ error: err.message });
  }
})

export default imagesRouter;
