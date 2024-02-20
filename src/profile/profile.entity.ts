import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserState } from './user-state.enum';
import { User } from 'src/auth/user.entity';

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
}
