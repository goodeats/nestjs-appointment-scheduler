import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  doctorId: string;
}
