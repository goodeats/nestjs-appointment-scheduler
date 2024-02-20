import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/auth/user-type.enum';
import { User } from 'src/auth/user.entity';
import { GetInsurancesFilterDto } from 'src/insurance/dto/get-insurances-filter.dto';
import { Insurance } from 'src/insurance/insurance.entity';
import { InsurancesRepository } from 'src/insurance/insurances.repository';
import { Profile } from 'src/profile/profile.entity';
import { ProfilesRepository } from 'src/profile/profiles.repository';

@Injectable()
export class PatientsInsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private insurancesRepository: InsurancesRepository,

    @InjectRepository(Profile)
    private profilesRepository: ProfilesRepository,
  ) {}

  async getInsurancesByPatientId(
    insurancesFilterDto: GetInsurancesFilterDto,
    user: User,
  ): Promise<Insurance> {
    // this could be its own decorator
    if (user.type !== UserType.PATIENT) {
      throw new UnauthorizedException('User is not a patient');
    }

    const insurances = await this.profilesRepository.getInsurances(
      user.profile,
    );
    if (insurances.length === 0) {
      throw new NotFoundException('Insurance not found');
    }

    return insurances[0];
  }

  async createInsuranceByPatientId(
    createDoctorInsuranceDto,
    user: User,
  ): Promise<void> {
    if (user.type !== UserType.PATIENT) {
      throw new UnauthorizedException('User is not a patient');
    }

    // Get the insurance
    const { insuranceId } = createDoctorInsuranceDto;
    const insurance = await this.insurancesRepository.findOne({
      where: { id: insuranceId },
    });
    if (!insurance) {
      throw new NotFoundException('Insurance not found');
    }

    return await this.profilesRepository.addPatientInsurance(
      user.profile,
      insurance,
    );
  }
}
