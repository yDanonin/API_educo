import { DeleteResult, getRepository } from 'typeorm';

import Post from '../models/Post';

interface Request {
    id: number;
}
class DeletePostService{
    public async execute({ id }: Request): Promise<DeleteResult>{
        const postsRepository = getRepository(Post);

        const checkPostExists = await postsRepository.findOne({
            where: { id },
        });

        if(!checkPostExists){
            throw new Error('post does not exist');
        };

        const deletePost = await postsRepository.delete(id)

        return deletePost;
    }

}

export default DeletePostService;
