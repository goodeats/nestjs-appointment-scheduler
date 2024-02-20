import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsRepository } from './appointments.repository';
import { User } from 'src/auth/user.entity';
import { Profile } from 'src/profile/profile.entity';
import { ProfilesRepository } from 'src/profile/profiles.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UserType } from 'src/auth/user-type.enum';

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

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    user: User,
  ): Promise<void> {
    if (user.type !== UserType.PATIENT) {
      throw new UnauthorizedException(
        'A patient must be the one to create an appointment',
      );
    }

    const patientProfile = await this.profilesRepository.getProfile(user);
    if (!patientProfile) {
      throw new NotFoundException('Profile not found');
    }

    const { doctorId } = createAppointmentDto;
    const doctorProfile =
      await this.profilesRepository.getDoctorProfileById(doctorId);
    if (!doctorProfile) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctorProfile.state !== patientProfile.state) {
      throw new UnauthorizedException(
        'Doctor and patient must be in the same state',
      );
    }

    return await this.appointmentRepository.createAppointment(
      patientProfile,
      doctorProfile,
    );
  }
}
