import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

import Group from './Group';
import User from './User';

@Entity('participants')
class Participant {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  groupId: number;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  users: User;

  @OneToMany(() => Group, (group) => group.id)
  @JoinColumn({ name: "imageId" })
  group: Group;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Participant;
