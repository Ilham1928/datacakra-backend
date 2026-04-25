import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Link } from '../link/link.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  url: string;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];
}
