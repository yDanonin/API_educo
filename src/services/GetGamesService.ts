import { getRepository } from 'typeorm';

import Games from '../models/Games';

interface Request{
  id: number
}
class GetGamesService{
    public async execute({ id }: Request): Promise<Games>{
      const gamesRepository = getRepository(Games)
      const games = await gamesRepository.findOne({where:{id}})

      return games;
  }
}
export default GetGamesService;
