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

      let contador: number = 0
      for(let group of participant){
        groups[contador] = await groupRepository.find({where:{ id: group.groupId }});
        contador += 1
      }

      return groups;
  }
}
export default GetGroupsService;
