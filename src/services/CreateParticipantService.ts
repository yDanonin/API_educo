import { getRepository } from 'typeorm';

import Participant from '../models/Participant';
import User from '../models/User'

interface Request {
    userId: string;
    groupId: number;
}
class CreateParticipantService{
    public async execute({ userId, groupId }: Request): Promise<User>{
        const participantsRepository = getRepository(Participant);

        const participant = participantsRepository.create({
          userId,
          groupId,
        });

        await participantsRepository.save(participant);

        const usersRepository = getRepository(User)

        const user = usersRepository.findOne({where: {id: userId}})

        delete (await user).password

        return user;
    }

}

export default CreateParticipantService;
