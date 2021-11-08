import { Between, getRepository } from 'typeorm';

import Post from '../models/Post';

interface post{
  groupId: number,
  startIndex?: number,
  quantity?: number
}
class GetPostService{
    public async execute({ groupId, startIndex, quantity }: post): Promise<any>{
      console.log(groupId)
      const postRepository = getRepository(Post)
      const checkPostExists = await postRepository.findOne({where: {groupId}})
      console.log(checkPostExists)
      if(checkPostExists){
        if(startIndex != null && quantity != null){
          const post = await postRepository.find({groupId,id: Between(startIndex-quantity+1, startIndex)})
          return post;
        }
        else if(quantity != null){
          const lastPost = await postRepository.findOne({where: {groupId}, order:{id:"DESC"}})
          const post = await postRepository.find({groupId,id: Between(lastPost['id']-quantity+1, lastPost['id'])})
          return post;
        }
        else{
          const post = await postRepository.find({where: {groupId}})
          return post
        }
      }
      else{
        return []
      }

  }
}
export default GetPostService;
