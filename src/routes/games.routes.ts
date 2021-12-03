import { Router } from "express";
import multer from 'multer'

import CreateGamesService from "../services/CreateGamesService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const gamesRouter = Router()

gamesRouter.use(ensureAuthenticated);

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'src/games')
  },
  filename: function(req, file, cb){
    cb(null, req.user.id +'.'+ file.originalname)
  }
})

const upload = multer({
  storage: storage//,
 })

gamesRouter.post('/', upload.single('game'), async (req, res) => {
  try{
    const diretorio = __dirname.split('src')[0]
    const userId = req.user.id
    const { type, description, keyWords } = req.body
    const createGames = new CreateGamesService();
    const games = await createGames.execute({
      userId,
      apkName: userId+'.'+req.file.originalname,
      type,
      description,
      keyWords,
      local: diretorio+req.file.path,
    })

    return res.json(games)
  }catch (err){
    return res.status(400).json({ error: err.message });
  }

});

export default gamesRouter;
