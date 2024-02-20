import { IsNotEmpty } from 'class-validator';

export class CreatePatientInsuranceDto {
  @IsNotEmpty()
  insuranceId: string;
}
