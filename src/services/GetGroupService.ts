import { getRepository } from 'typeorm';

import Group from '../models/Group'

interface request{
  id: number
}
class GetGroupsService{
    public async execute({ id }: request): Promise<Group>{
      const groupRepository = getRepository(Group)
      const group = await groupRepository.findOne({ where:{id}})

      return group;
  }
}
export default GetGroupsService;
