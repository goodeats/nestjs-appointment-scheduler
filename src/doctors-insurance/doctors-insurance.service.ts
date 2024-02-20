import {
  ConflictException,
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
export class DoctorsInsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private insurancesRepository: InsurancesRepository,

    @InjectRepository(Profile)
    private profilesRepository: ProfilesRepository,
  ) {}

  async getInsurancesByDoctorId(
    insurancesFilterDto: GetInsurancesFilterDto,
    user: User,
  ): Promise<Insurance[]> {
    // this could be its own decorator
    if (user.type !== UserType.DOCTOR) {
      throw new UnauthorizedException('User is not a doctor');
    }

    return await this.profilesRepository.getInsurances(user.profile);
  }

  async createInsuranceByDoctorId(
    createDoctorInsuranceDto,
    user: User,
  ): Promise<void> {
    if (user.type !== UserType.DOCTOR) {
      throw new UnauthorizedException('User is not a doctor');
    }

    // Get the insurance
    const { insuranceId } = createDoctorInsuranceDto;
    const insurance = await this.insurancesRepository.findOne({
      where: { id: insuranceId },
    });
    if (!insurance) {
      throw new NotFoundException('Insurance not found');
    }

    return await this.profilesRepository.addInsurance(user.profile, insurance);
  }
}
