import { Profile } from 'src/profile/profile.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;

  @ManyToMany(() => Profile, (profile) => profile.appointments)
  profiles: Profile[];

  // join with insurance would be good to add as well
  // will verify patient and doctor share the same insurance on the repositroy level
}
