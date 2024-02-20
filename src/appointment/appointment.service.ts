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

    // Get the patient profile
    const patientProfile = await this.profilesRepository.getProfile(user);
    if (!patientProfile) {
      throw new NotFoundException('Profile not found');
    }

    // Get the doctor profile
    const { doctorId } = createAppointmentDto;
    const doctorProfile =
      await this.profilesRepository.getDoctorProfileById(doctorId);
    if (!doctorProfile) {
      throw new NotFoundException('Doctor not found');
    }

    // check if doctor and patient are in the same state
    if (doctorProfile.state !== patientProfile.state) {
      throw new UnauthorizedException(
        'Doctor and patient must be in the same state',
      );
    }

    // check if patient has insurance
    const patientInsurance =
      await this.profilesRepository.getInsurances(patientProfile);
    if (patientInsurance.length === 0) {
      throw new UnauthorizedException('Patient does not have insurance');
    }
    const patientInsuranceId = patientInsurance[0].id;

    // check if doctor takes patient insurance
    const doctorInsurance =
      await this.profilesRepository.getInsurances(doctorProfile);
    const doctorTakesPatientInsurance = doctorInsurance.find(
      (doctorInsurance) => doctorInsurance.id === patientInsuranceId,
    );

    if (!doctorTakesPatientInsurance) {
      throw new UnauthorizedException(
        'Doctor does not accept patient insurance',
      );
    }

    return await this.appointmentRepository.createAppointment(
      patientProfile,
      doctorProfile,
    );
  }
}
