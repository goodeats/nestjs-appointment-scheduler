import { Repository } from 'typeorm';
import { Insurance } from './insurance.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface InsurancesRepository extends Repository<Insurance> {
  this: Repository<Insurance>;
  getInsurances(): Promise<Insurance[]>;
}

export const customInsurancesRepository: Pick<InsurancesRepository, any> = {
  async getInsurances(this: Repository<Insurance>): Promise<Insurance[]> {
    const query = this.createQueryBuilder('insurance');
    return await query.getMany();
  },
};
