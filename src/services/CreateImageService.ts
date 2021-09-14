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
