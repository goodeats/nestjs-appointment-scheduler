import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { UserState } from '../user-state.enum';

// aside from email, password, and type which are used for authentication
export class UserProfileDto {
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  lastName: string;

  @IsEnum(UserState)
  state: UserState;
}
