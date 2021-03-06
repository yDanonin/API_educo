import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import User from '../models/User';
import CreateImageService from './CreateImageService'
import AlterAvatarService from './AlterAvatarService'

interface Request {
    name: string;
    email: string;
    password: string;
    birth: Date;
    bio?: string;
    nameImage?: string;
    localImage?: string;
}
class CreateUserService{
    public async execute({ name, email, password, nameImage, bio, birth, localImage }: Request): Promise<User>{
        const usersRepository = getRepository(User);
        const createImage = new CreateImageService();
        const alterAvatar = new AlterAvatarService();

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if(checkUserExists){
            throw new Error('Email address already used.');
        };

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            bio,
            birth,
            password: hashedPassword,
        });


        await usersRepository.save(user);

        if(localImage != null && nameImage != null){
          const image = await createImage.execute({
            userId: user.id,
            nome: nameImage,
            local: localImage
          })
          await alterAvatar.execute({
            id: user.id,
            avatar: image.id
          })
        }

        if(user.avatar){
          user.imageUrl = global.baseUrl+'/images/by_id/'+user.avatar
        }

        return user;
    }

}

export default CreateUserService;
