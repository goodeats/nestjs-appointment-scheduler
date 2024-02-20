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
    if (user.type !== UserType.DOCTOR) {
      throw new UnauthorizedException('User is not a doctor');
    }

    return user.profile.insurances;
    // not filtering right now
    // return this.insurancesRepository.getInsurances(
    //   insurancesFilterDto,
    //   user.profile,
    // );
  }
}
