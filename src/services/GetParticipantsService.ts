import { getRepository} from "typeorm";

import Participant from "../models/Participant";
import User from "../models/User";

interface Request{
  groupId: number,
}
class GetParticipantsService{
  public async execute({ groupId }: Request): Promise<Array<User>>{
    const participantRepository = getRepository(Participant)
    const userRepository = getRepository(User)

    const participants = await participantRepository.find({where: {groupId}})

    const users: Array<any> = []
    let contador: number = 0
    for(let participant of participants){
      users.push(await userRepository.find({where: {id: participant.userId}}))
      delete users[contador][0].password
      delete users[contador][0].email
      contador += 1
    }
    return users
  }
}

export default GetParticipantsService
