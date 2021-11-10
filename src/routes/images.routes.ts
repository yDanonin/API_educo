import { Router } from "express";
import multer from 'multer'

import CreateImageService from "../services/CreateImageService";
import GetImageService from "../services/GetImageService";
import DeleteImageService from "../services/DeleteImageService";


const imagesRouter = Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'src/upload')
  },
  filename: function(req, file, cb){
    cb(null, /*new Date().toISOString() +*/ file.originalname)
  }
})

/*
function fileFilter(req, file, cb) {
  if(file.mimetype === "image/jpg" || file.mimetype === "image/png"){
    cb(null, true)
  } else{
    cb(null, false)
  }
}
*/

const upload = multer({
  storage: storage//,
  //fileFilter: fileFilter
 })

imagesRouter.post('/', upload.single('image'), async (req, res) => {
  try{
    const { userId, name, local } = req.body
    const image = req.file
    console.log(image, name)
    //const createImage = new CreateImageService();

    /*const images = await createImage.execute({
      userId,
      nome: name,
      local,
    })*/

    return res.json(image)
  }catch (err){

    return res.status(400).json({ error: err.message });
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
imagesRouter.delete('/:id', async (req, res) => {
    try{
      const StringId = req.params.id
      const id = +StringId
      const deleteImage = new DeleteImageService()

      const response = await deleteImage.execute({id})

      res.json(response);
    }catch(err){
      res.status(400).json({error: err.message})
    }
})

export default imagesRouter;
