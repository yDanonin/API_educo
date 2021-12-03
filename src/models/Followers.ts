import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

import User from './User';

@Entity('followers')
class Followers {
  @PrimaryColumn()
  follower: string;

  @PrimaryColumn()
  followed: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "follower" })
  followerId: User;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "followed" })
  folloedId: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Followers;
