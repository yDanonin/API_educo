import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

import Images from './Images';
import User from './User';
import Group from './Group'

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  userId: string

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  users: User;

  @Column()
  groupId: number

  @OneToMany(() => Group, (group) => group.id)
  @JoinColumn({ name: "groupId" })
  group: Group;

  @Column()
  imageId: number

  @OneToMany(() => Images, (images) => images.id)
  @JoinColumn({ name: "imageId" })
  images: Images;

  imageUrl: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;
