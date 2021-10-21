import { Between, getRepository } from 'typeorm';

import Post from '../models/Post';

interface post{
  groupId: number,
  firstIndex?: number,
  lastIndex?: number
}
class GetPostService{
    public async execute({ groupId, firstIndex, lastIndex }: post): Promise<any>{
      const postRepository = getRepository(Post)
      if(firstIndex != null && lastIndex != null){
        const post = await postRepository.find({groupId,id: Between(firstIndex,lastIndex)})
        return post;
      }
      else{
        const post = await postRepository.find({where: {groupId}})
        return post
      }
  }
}
export default GetPostService;
