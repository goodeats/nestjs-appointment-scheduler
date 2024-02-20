import { IsOptional, IsString } from 'class-validator';

export class GetInsurancesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  // no state option since users should only be able
  // to see insurances that are in their state
  // @IsOptional()
  // @IsEnum(UserState)
  // state?: UserState;
}
