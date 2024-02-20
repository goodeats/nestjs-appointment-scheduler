import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './user-type.enum';
import { Profile } from 'src/profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  type: UserType;

  @OneToOne(() => Profile, (profile) => profile.user, { eager: true })
  @JoinColumn()
  profile: Profile;
}
