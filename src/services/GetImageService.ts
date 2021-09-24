import { getRepository } from 'typeorm';

import Images from '../models/Images';

interface Image{
  id: number
}
class GetImageService{
    public async execute({ id }: Image): Promise<Images>{
      const imageRepository = getRepository(Images)
      const images = await imageRepository.findOne({where:{id}})

      return images;
  }
}
export default GetImageService;
