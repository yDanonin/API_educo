import { getRepository } from 'typeorm';

import User from '../models/User';
import Image from '../models/Images'

interface Request {
    id: string,
    avatar?: number,
}
class AlterAvatarService{
    public async execute({ id,  avatar }: Request): Promise<Image>{
        const usersRepository = getRepository(User);
        const imageRepository = getRepository(Image);

        const checkUserExists = await usersRepository.findOne({
          where: { id },
        });
        const checkImageExist = await imageRepository.findOne({
          where: { id: avatar, userId: id }
        })

        if (!checkImageExist){
          throw new Error('image does not exist')
        }

        checkUserExists.avatar = avatar
        await usersRepository.save(checkUserExists);

        return checkImageExist
    }
}

export default AlterAvatarService;
