import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customAppointmentsRepository } from './appointments.repository';
import { Profile } from 'src/profile/profile.entity';
import { customProfilesRepository } from 'src/profile/profiles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), AuthModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    {
      provide: getRepositoryToken(Appointment),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource
          .getRepository(Appointment)
          .extend(customAppointmentsRepository),
    },
    {
      provide: getRepositoryToken(Profile),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Profile).extend(customProfilesRepository),
    },
  ],
})
export class AppointmentModule {}
