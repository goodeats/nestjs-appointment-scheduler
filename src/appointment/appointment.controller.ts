import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointment')
@UseGuards(AuthGuard())
export class AppointmentController {}
