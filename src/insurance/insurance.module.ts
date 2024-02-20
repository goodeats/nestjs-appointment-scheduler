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
import { Profile } from 'src/profile/profile.entity';
import { customProfilesRepository } from 'src/profile/profiles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance]), AuthModule],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
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
export class InsuranceModule {}
