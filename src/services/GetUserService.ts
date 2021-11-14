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

        if(checkUserExists.avatar){
          checkUserExists.imageUrl = global.baseUrl+'/images/by_id/'+checkUserExists.avatar
        }
        return checkUserExists;
    }

}

export default GetUserService;
