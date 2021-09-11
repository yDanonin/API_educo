import { getRepository } from 'typeorm';

import Images from '../models/Images';

interface Request {
    nome: string;
    tipo: string;
    userId: string;
    local: string;

}
class CreateImageService{
    public async execute({ userId, nome, local, tipo }: Request): Promise<Images>{
      const imageRepository = getRepository(Images)

      const images = imageRepository.create({
        userId,
        nome,
        local,
        tipo,

    });

    await imageRepository.save(images);

    return images;
  }
}
export default CreateImageService;
