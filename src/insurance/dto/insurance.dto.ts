import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserState } from 'src/profile/user-state.enum';

export class InsuranceDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @IsEnum(UserState)
  state: UserState;
}
