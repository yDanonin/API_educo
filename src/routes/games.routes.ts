import { Router } from "express";
import multer from 'multer'

import CreateGamesService from "../services/CreateGamesService";
<<<<<<< HEAD
import GetGamesService from "../services/GetGamesService";
=======
>>>>>>> 70919bed9000a7cb2ee1466f6485572770c04a64
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

<<<<<<< HEAD
gamesRouter.get('/by_id/:id', async (req, res) => {
  try{
    const StringId  = req.params.id;
    const id = +StringId
    const getGames = new GetGamesService()
    const games = await getGames.execute({id})
    return res.sendFile(games.local)
  }
  catch(err){
    return res.status(400).json({ error: err.message });
  }
})

=======
>>>>>>> 70919bed9000a7cb2ee1466f6485572770c04a64
export default gamesRouter;
