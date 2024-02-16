import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface DoctorsRepository extends Repository<Doctor> {
  this: Repository<Doctor>;
}

export const customDoctorsRepository: Pick<DoctorsRepository, any> = {};
