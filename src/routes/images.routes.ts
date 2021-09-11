import { Router } from "express";
import CreateImageService from "../services/CreateImageService";

const imagesRouter = Router()

imagesRouter.post('/', async (request, response) => {
  try{
    const { userId, nome, local, tipo } = request.body
    const createImage = new CreateImageService();
    const images = await createImage.execute({
      userId,
      nome,
      local,
      tipo,
    })

    return response.json(images)
  }catch (err){

    return response.status(400).json({ error: err.message });
  }
});

export default imagesRouter;
