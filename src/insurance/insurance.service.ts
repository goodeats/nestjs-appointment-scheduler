import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsurancesRepository } from './insurances.repository';
import { Insurance } from './insurance.entity';
import { InsuranceDto } from './dto/insurance.dto';
import { User } from 'src/auth/user.entity';
import { GetInsurancesFilterDto } from './dto/get-insurances-filter.dto';
import { ProfilesRepository } from 'src/profile/profiles.repository';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private insurancesRepository: InsurancesRepository,

    @InjectRepository(Profile)
    private profilesRepository: ProfilesRepository,
  ) {}

  async getInsurances(
    insurancesFilterDto: GetInsurancesFilterDto,
    user: User,
  ): Promise<Insurance[]> {
    return this.insurancesRepository.getInsurances(
      insurancesFilterDto,
      user.profile,
    );
  }

  async createInsurance(insuranceDto: InsuranceDto): Promise<void> {
    return await this.insurancesRepository.createInsurance(insuranceDto);
  }
}
