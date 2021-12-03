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

@Entity('groups')
class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  creator: string

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "creator" })
  users: User;

  @Column()
  imageId: number

  @OneToMany(() => Images, (images) => images.id)
  @JoinColumn({ name: "imageId" })
  images: Images;

  @Column()
  name: string

  @Column()
  isPrivate: boolean

  imageUrl: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Group;
