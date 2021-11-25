import { getRepository } from 'typeorm';

import Group from '../models/Group';
import Image from '../models/Images'

interface Request {
    id: number,
    userId: string,
    imageId?: number,
}
class AlterGroupImageService{
    public async execute({ userId,  imageId, id }: Request): Promise<Group>{
        const groupRepository = getRepository(Group);
        const imageRepository = getRepository(Image);

        const checkGroupExists = await groupRepository.findOne({
          where: { id },
        });
        const checkImageExist = await imageRepository.findOne({
          where: { id: imageId, userId: userId }
        })

        if (!checkImageExist){
          throw new Error('image does not exist')
        }

        checkGroupExists.imageId = imageId
        await groupRepository.save(checkGroupExists);

        return checkGroupExists
    }
}

export default AlterGroupImageService;
