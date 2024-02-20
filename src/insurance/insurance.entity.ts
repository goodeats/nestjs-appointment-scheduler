import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Insurance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // assume all states for now
}
