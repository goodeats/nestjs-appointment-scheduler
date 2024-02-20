import { Module } from '@nestjs/common';
import { PatientsInsuranceController } from './patients-insurance.controller';
import { PatientsInsuranceService } from './patients-insurance.service';
import { AuthModule } from 'src/auth/auth.module';
import { Insurance } from 'src/insurance/insurance.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customInsurancesRepository } from 'src/insurance/insurances.repository';
import { Profile } from 'src/profile/profile.entity';
import { customProfilesRepository } from 'src/profile/profiles.repository';

@Module({
  imports: [AuthModule],
  controllers: [PatientsInsuranceController],
  providers: [
    PatientsInsuranceService,
    {
      provide: getRepositoryToken(Insurance),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Insurance).extend(customInsurancesRepository),
    },
    {
      provide: getRepositoryToken(Profile),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Profile).extend(customProfilesRepository),
    },
  ],
})
export class PatientsInsuranceModule {}
