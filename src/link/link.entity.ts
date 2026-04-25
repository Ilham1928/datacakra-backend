import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum OpenType {
  NEW_TAB = 'new_tab',
  REDIRECT = 'redirect',
}

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  color: string;

  @Column()
  status: string;

  @Column({ type: 'text' })
  openType: OpenType;

  // 🔥 RELASI KE USER
  @ManyToOne(() => User, (user: User) => user.links, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
