import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface Request {
    userId: string;
    text: string;
    imageId?: number;
}
class CreatePostService{
    public async execute({ userId, text, imageId }: Request): Promise<Post>{
        const postsRepository = getRepository(Post);

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
