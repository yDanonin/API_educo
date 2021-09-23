import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    id: string;
}
class GetUserService{
    public async execute({ id }: Request): Promise<User>{
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { id },
        });

        if(!checkUserExists){
            throw new Error('user does not exist');
        };

        delete checkUserExists.password
        delete checkUserExists.email

        return checkUserExists;
    }

}

export default GetUserService;
