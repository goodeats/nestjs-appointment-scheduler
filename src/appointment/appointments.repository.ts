import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Profile } from 'src/profile/profile.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface AppointmentsRepository extends Repository<Appointment> {
  this: Repository<Appointment>;
  createAppointment(
    patientProfile: Profile,
    doctorProfile: Profile,
  ): Promise<void>;
}

export const customAppointmentsRepository: Pick<AppointmentsRepository, any> = {
  async createAppointment(
    patientProfile: Profile,
    doctorProfile: Profile,
  ): Promise<void> {
    const profiles = [patientProfile, doctorProfile];
    const appointment = this.create({
      doctorId: doctorProfile.id,
      patientId: patientProfile.id,
      profiles,
    });
    return await this.save(appointment);
  },
};
