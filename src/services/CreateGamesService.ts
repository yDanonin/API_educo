import { getRepository } from 'typeorm';

import Games from '../models/Games';

interface Request {
    apkName?: string;
    userId: string;
    type: string
    description: string
    local: string
    keyWords: string;

}
class CreateGamesService{
    public async execute({ userId, apkName, type, description, local, keyWords }: Request): Promise<Games>{
      const gamesRepository = getRepository(Games)

      const games = gamesRepository.create({
        creatorId: userId,
        apkName,
        type,
        description,
        local,
        keyWords,

    });

    await gamesRepository.save(games);

    return games;
  }
}
export default CreateGamesService;
