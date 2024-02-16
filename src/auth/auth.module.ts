import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DataSource } from 'typeorm';
import { customDoctorsRepository } from './doctors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: getRepositoryToken(Doctor),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Doctor).extend(customDoctorsRepository),
    },
  ],
})
export class AuthModule {}
