import { Repository } from 'typeorm';
import { Insurance } from './insurance.entity';
import { InsuranceDto } from './dto/insurance.dto';
import { ConflictException } from '@nestjs/common';
import { GetInsurancesFilterDto } from './dto/get-insurances-filter.dto';
import { Profile } from 'src/profile/profile.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface InsurancesRepository extends Repository<Insurance> {
  this: Repository<Insurance>;
  getInsurances(
    insurancesFilterDto: GetInsurancesFilterDto,
    profile: Profile,
  ): Promise<Insurance[]>;
  createInsurance(insuranceDto: InsuranceDto): Promise<void>;
}

export const customInsurancesRepository: Pick<InsurancesRepository, any> = {
  async getInsurances(
    this: Repository<Insurance>,
    insurancesFilterDto: GetInsurancesFilterDto,
    profile: Profile,
  ): Promise<Insurance[]> {
    const { search } = insurancesFilterDto;
    const query = this.createQueryBuilder('insurance');

    const state = profile.state;
    query.where('insurance.state = :state', { state });

    if (search) {
      // wrap in parens to avoid precedence issues
      query.andWhere('(LOWER(insurance.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  },

  async createInsurance(
    this: Repository<Insurance>,
    insuranceDto: InsuranceDto,
  ): Promise<void> {
    const insurance = this.create({
      ...insuranceDto,
    });

    try {
      await this.save(insurance);
    } catch (error) {
      const duplicateName = error.code === '23505';
      if (duplicateName) {
        throw new ConflictException('Name already exists');
      } else {
        throw error;
      }
    }
  },
};
