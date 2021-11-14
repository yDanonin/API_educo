import { getRepository } from 'typeorm';

import Participant from '../models/Participant';
import Group from '../models/Group'

interface Image{
  userId: string
}
class GetGroupsService{
    public async execute({ userId }: Image): Promise<Array<Group>>{
      const participantRepository = getRepository(Participant)
      const groupRepository = getRepository(Group)
      const participant = await participantRepository.find({ where:{userId }})

      const groups: Array<any> = []

      for(let group of participant){
        groups.push(await groupRepository.findOne({where:{ id: group.groupId }}));
      }
      for(let i = 0; i<groups.length; i++){
        if(groups[i].imageId){
          groups[i].imageUrl = global.baseUrl+'/images/by_id/'+groups[i].imageId
        }
      }

      return groups;
  }
}
export default GetGroupsService;
