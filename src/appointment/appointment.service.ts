import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsRepository } from './appointments.repository';
import { User } from 'src/auth/user.entity';
import { Profile } from 'src/profile/profile.entity';
import { ProfilesRepository } from 'src/profile/profiles.repository';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: AppointmentsRepository,

    @InjectRepository(Profile)
    private profilesRepository: ProfilesRepository,
  ) {}

  async getAppointments(user: User): Promise<Appointment[]> {
    const profile = await this.profilesRepository.getProfile(user);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return await this.profilesRepository.getAppointments(profile);
  }
}
