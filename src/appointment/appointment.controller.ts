import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentService } from './appointment.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
@UseGuards(AuthGuard())
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  getAppointments(@GetUser() user: User) {
    return this.appointmentService.getAppointments(user);
  }

  @Post()
  createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetUser() user: User,
  ) {
    return this.appointmentService.createAppointment(
      createAppointmentDto,
      user,
    );
  }
}
