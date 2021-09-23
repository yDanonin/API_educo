import { DeleteResult, getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    id: string;
}
class DeleteUserService{
    public async execute({ id }: Request): Promise<DeleteResult>{
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { id },
        });

        if(!checkUserExists){
            throw new Error('user does not exist');
        };

        const deleteUser = await usersRepository.delete(id)

        return deleteUser;
    }

}

export default DeleteUserService;
