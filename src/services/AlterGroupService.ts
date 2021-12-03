import { getRepository } from 'typeorm';

import Group from '../models/Group';
import Image from '../models/Images'

interface Request {
    id: number,
    userId: string,
    description?: string,
    name?: string,
    imageId?: number,


}
class AlterGroupService{
    public async execute({ userId, imageId, description, id, name }: Request): Promise<Group>{
        const groupRepository = getRepository(Group);
        const imageRepository = getRepository(Image)
        const group = await groupRepository.findOne({where:{id}})

        if(group.imageId != imageId && imageId ){
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
        }
        if(group.name != name){
          group.name = name;
        }
        if(group.description != description){
          group.description = description;
        }
        await groupRepository.save(group);
        if(group.imageId){
          group.imageUrl = global.baseUrl+'/images/by_id/'+group.imageId
        }
        return group
    }
}

export default AlterGroupService;
