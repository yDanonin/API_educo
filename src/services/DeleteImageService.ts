import { DeleteResult, getRepository } from 'typeorm';

import Image from '../models/Images';

interface Request {
    id: number;
}
class DeleteImageService{
    public async execute({ id }: Request): Promise<DeleteResult>{
        const imagesRepository = getRepository(Image);

        const checkImageExists = await imagesRepository.findOne({
            where: { id },
        });

        if(!checkImageExists){
            throw new Error('image does not exist');
        };

        const deleteImage = await imagesRepository.delete(id)

        return deleteImage;
    }

}

export default DeleteImageService;
