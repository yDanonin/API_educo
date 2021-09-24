import { getRepository } from 'typeorm';

import Post from '../models/Post';
import Image from '../models/Images';

interface Request {
    userId: string;
    text: string;
    imageId?: number;
}
class CreatePostService{
    public async execute({ userId, text, imageId }: Request): Promise<Post>{
        const postsRepository = getRepository(Post);
        const imageRepository = getRepository(Image)
        if(imageId != null){
          const checkImageExist = await imageRepository.findOne({
            where: { id: imageId, userId }
          })

          if (!checkImageExist){
            throw new Error('image does not exist')
          }
        }

        const post = postsRepository.create({
            userId,
            text,
            imageId
        });



        await postsRepository.save(post);

        return post;
    }

}

export default CreatePostService;
