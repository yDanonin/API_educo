import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface post{
  groupId: number
}
class GetPostService{
    public async execute({ groupId }: post): Promise<Array<Post>>{
      const postRepository = getRepository(Post)
      const post = await postRepository.find({where: {groupId}})

      return post;
  }
}
export default GetPostService;
