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

@Entity('images')
class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  users: User;

  @Column('varchar')
  nome: string;

  @Column('varchar')
  local: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Images;

