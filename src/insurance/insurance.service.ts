import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsurancesRepository } from './insurances.repository';
import { Insurance } from './insurance.entity';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private insurancesRepository: InsurancesRepository,
  ) {}

  async getInsurances(): Promise<Insurance[]> {
    return this.insurancesRepository.getInsurances();
  }
}
