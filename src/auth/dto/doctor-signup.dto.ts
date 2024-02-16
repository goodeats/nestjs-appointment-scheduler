import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DoctorState } from '../doctor-state.enum';

export class DoctorSignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  // Password must contain at least
  // - one lowercase letter
  // - one uppercase letter
  // - and one number
  // Minimum length of 8 characters
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak',
  })
  password: string;

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
