import { getRepository } from "typeorm";

import Answer from '../models/Answer';

interface Request{
  answerId: number,
  postId: number
}

class CreateAnswerService{
  public async execute({ answerId, postId }:Request): Promise<Answer>{
    const answerRepository = getRepository(Answer)
    const answer = answerRepository.create({
      answerId: answerId,
      postId: postId,
    })
    await answerRepository.save(answer)
    return answer
  }
}

export default CreateAnswerService;
