import { range } from 'rxjs';
import { Between, getRepository } from 'typeorm';

import Post from '../models/Post';

interface post{
  groupId: number,
  startIndex?: number,
  quantity?: number
}
class GetPostService{
    public async execute({ groupId, startIndex, quantity }: post): Promise<any>{
      const postRepository = getRepository(Post)
      const checkPostExists = await postRepository.findOne({where: {groupId}})
      if(checkPostExists){
        if(startIndex != null && quantity != null){
          const post = await postRepository.find({groupId,id: Between(startIndex-quantity+1, startIndex)})
          for(let i = 0; i<post.length; i++){
            if(post[i].imageId){
              post[i].imageUrl = global.baseUrl+'/images/by_id/'+post[i].imageId
            }
          }
          return post;
        }
        else if(quantity != null){
          const lastPost = await postRepository.findOne({where: {groupId}, order:{id:"DESC"}})
          const post = await postRepository.find({groupId,id: Between(lastPost['id']-quantity+1, lastPost['id'])})
          for(let i = 0; i<post.length; i++){
            if(post[i].imageId){
              post[i].imageUrl = global.baseUrl+'/images/by_id/'+post[i].imageId
            }
          }
          return post;
        }
        else{
          const post = await postRepository.find({where: {groupId}})
          for(let i = 0; i<post.length; i++){
            if(post[i].imageId){
              post[i].imageUrl = global.baseUrl+'/images/by_id/'+post[i].imageId
            }
          }
          return post
        }
      }
      else{
        return []
      }

  }
}
export default GetPostService;
