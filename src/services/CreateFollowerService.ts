import { getRepository } from "typeorm";

import Followers from '../models/Followers';

interface Request{
  follower: string,
  followed: string
}

class CreateFollowerService{
  public async execute({ follower, followed }:Request): Promise<Followers>{
    const followersRepository = getRepository(Followers)
    const followers = followersRepository.create({
      follower: follower,
      followed: followed,
    })
    await followersRepository.save(followers)
    return followers
  }
}

export default CreateFollowerService;
