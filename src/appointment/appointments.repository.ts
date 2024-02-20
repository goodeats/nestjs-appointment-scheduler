import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { User } from 'src/auth/user.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface AppointmentsRepository extends Repository<Appointment> {
  this: Repository<Appointment>;
  getAppointments(user: User): Promise<Appointment[]>;
}

export const customAppointmentsRepository: Pick<AppointmentsRepository, any> = {
  async getAppointments(user: User): Promise<Appointment[]> {
    return this.find({ where: { user } });
  },
};