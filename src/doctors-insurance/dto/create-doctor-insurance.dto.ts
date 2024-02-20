import { IsNotEmpty } from 'class-validator';

export class CreateDoctorInsuranceDto {
  @IsNotEmpty()
  insuranceId: string;
}
