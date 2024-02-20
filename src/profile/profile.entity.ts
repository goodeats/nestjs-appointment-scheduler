import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserState } from './user-state.enum';
import { User } from 'src/auth/user.entity';
import { Insurance } from 'src/insurance/insurance.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  state: UserState;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  // will limit to one in business logic for patients
  @ManyToMany(() => Insurance, (insurance) => insurance.profiles)
  insurances: Insurance[];
}
