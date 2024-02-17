import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { DoctorState } from '../doctor-state.enum';
import { AuthCredentialsDto } from './auth-credentials.dto';

// taking full doctor entity attributes on signup
// didn't find an easy way to split the DTO at the controller
// without the DoctorProfileDto also including the email and password
// maybe that's a good thing for the body of the request to be all-inclusive and split later
// may also be better UX/DX to have separate endpoints for signup and profile details
// just trying things out as I explore NextJS
export class DoctorSignupDto extends AuthCredentialsDto {
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
