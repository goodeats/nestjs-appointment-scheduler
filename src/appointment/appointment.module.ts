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

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
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
  ],
})
export class AppointmentModule {}
