import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

import User from './User';

@Entity('games')
class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: string

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "creatorId" })
  users: User;

  @Column()
  apkName: string

  @Column()
  keyWords: string

  @Column()
  type: string

  @Column()
  description: string;

  @Column()
  local: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Games;
