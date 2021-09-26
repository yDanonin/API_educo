import { getRepository } from 'typeorm';

import Participant from '../models/Participant';

interface Request {
    userId: string;
    groupId: number;
}
class CreateParticipantService{
    public async execute({ userId, groupId }: Request): Promise<Participant>{
        const participantsRepository = getRepository(Participant);

        const participant = participantsRepository.create({
          userId,
          groupId,
        });

        await participantsRepository.save(participant);

        return participant;
    }

}

export default CreateParticipantService;
