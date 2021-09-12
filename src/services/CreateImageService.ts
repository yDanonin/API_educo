import { getRepository } from 'typeorm';

import Images from '../models/Images';

interface Request {
    nome: string;
    userId: string;
    local: string;

}
class CreateImageService{
    public async execute({ userId, nome, local }: Request): Promise<Images>{
      const imageRepository = getRepository(Images)


      /*const checkImageProfileExist = await imageRepository.findOne({
        where: { userId, tipo: "Perfil"}
      });

      if(checkImageProfileExist){
        throw new Error('user has a profile picture')
      }*/


      const images = imageRepository.create({
        userId,
        nome,
        local,

    });



    await imageRepository.save(images);

    return images;
  }
}
export default CreateImageService;
