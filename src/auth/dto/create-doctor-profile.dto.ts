import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { DoctorState } from '../doctor-state.enum';

// aside from email and password which are used for authentication
export class CreateDoctorProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  lastName: string;

  @IsEnum(DoctorState)
  state: DoctorState;
}
