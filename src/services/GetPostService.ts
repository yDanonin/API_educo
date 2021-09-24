import { getRepository } from 'typeorm';

import Post from '../models/Post';

interface post{
  userId: string
}
class GetPostService{
    public async execute({ userId }: post): Promise<Array<Post>>{
      const postRepository = getRepository(Post)
      const post = await postRepository.find({where: {userId}})

      return post;
  }
}
export default GetPostService;
