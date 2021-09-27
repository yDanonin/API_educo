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
        groups.push(await groupRepository.find({where:{ id: group.groupId }}));
      }

      return groups;
  }
}
export default GetGroupsService;
