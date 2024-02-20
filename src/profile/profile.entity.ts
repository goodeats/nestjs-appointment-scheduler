import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserState } from './user-state.enum';
import { User } from 'src/auth/user.entity';
import { Insurance } from 'src/insurance/insurance.entity';
import { Appointment } from 'src/appointment/appointment.entity';

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
  @JoinTable()
  insurances: Insurance[];

  @ManyToMany(() => Appointment, (appointment) => appointment.profiles)
  @JoinTable()
  appointments: Appointment[];
}
