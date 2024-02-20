import { Profile } from 'src/profile/profile.entity';
import { UserState } from 'src/profile/user-state.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // TODO: move user state to a shared directory
  // insurance could possibly have many states
  // that might apply more for the overall organization
  // for the purposes of a doctor and patient having insurance, that belongs to one state
  @Column()
  state: UserState;

  @ManyToMany(() => Profile, (profile) => profile.insurances)
  profiles: Profile[];
}
