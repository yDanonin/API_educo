import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    id: string,
    avatar?: number,
}
class AlterUserService{
    public async execute({ id,  avatar }: Request): Promise<User>{
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
          where: { id },
      });

        checkUserExists.avatar = avatar
        //console.log(checkUserExists)
        return usersRepository.save(checkUserExists);
    }
}

export default AlterUserService;
