import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorState } from './doctor-state.enum';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  state: DoctorState;
}
