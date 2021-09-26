import { getRepository } from 'typeorm';

import Image from '../models/Images';
import Group from '../models/Group';

interface Request {
    creator: string;
    imageId: number;
    description: string;
    nome: string;
}
class CreateGroupService{
    public async execute({ creator, imageId, description, nome }: Request): Promise<Group>{
        const groupsRepository = getRepository(Group);
        const imageRepository = getRepository(Image);

        const checkImageExist = await imageRepository.findOne({
          where: { id: imageId, userId: creator }
        })
        if (!checkImageExist){
          throw new Error('image does not exist')
        }

        const group = groupsRepository.create({
            creator,
            imageId,
            description,
            nome,
        });

        await groupsRepository.save(group);

        return group;
    }

}

export default CreateGroupService;
