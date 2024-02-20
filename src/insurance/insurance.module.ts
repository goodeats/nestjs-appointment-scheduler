import { Module } from '@nestjs/common';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { Insurance } from './insurance.entity';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customInsurancesRepository } from './insurances.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
    {
      provide: getRepositoryToken(Insurance),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Insurance).extend(customInsurancesRepository),
    },
  ],
})
export class InsuranceModule {}
