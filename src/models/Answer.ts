import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

import Post from './Post';

@Entity('participants')
class Participant {
  @PrimaryColumn()
  answerId: number;

  @PrimaryColumn()
  postId: number;

  @OneToMany(() => Post, (post) => post.id)
  @JoinColumn({ name: "answerId" })
  postAnswer: Post;

  @OneToMany(() => Post, (post) => post.id)
  @JoinColumn({ name: "postId" })
  postAnswered: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Participant;
