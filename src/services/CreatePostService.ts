import { getRepository } from 'typeorm';

import Post from '../models/Post';
import Image from '../models/Images';
import Participant from '../models/Participant'

interface Request {
    userId: string;
    groupId: number;
    text: string;
    imageId?: number;
}
class CreatePostService{
    public async execute({ userId, text, imageId, groupId }: Request): Promise<Post>{
        const postsRepository = getRepository(Post);
        const imageRepository = getRepository(Image);
        const participantRepository = getRepository(Participant);
        if(imageId != null){
          const checkImageExist = await imageRepository.findOne({
            where: { id: imageId, userId }
          })
          if (!checkImageExist){
            throw new Error('image does not exist')
          }
        }
        const checkParticipantExist = await participantRepository.findOne({where: { userId, groupId }})

        if(!checkParticipantExist){
          throw new Error('user does not participating in this group or group/user does not exist')
        }

        const post = postsRepository.create({
            userId,
            groupId,
            text,
            imageId
        });



        await postsRepository.save(post);

        return post;
    }

}

export default CreatePostService;
