import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceDto } from './dto/insurance.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetInsurancesFilterDto } from './dto/get-insurances-filter.dto';
import { Insurance } from './insurance.entity';

@Controller('insurances')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}

  @Get()
  @UseGuards(AuthGuard())
  getInsurances(
    @Query() insurancesFilterDto: GetInsurancesFilterDto,
    @GetUser() user: User,
  ): Promise<Insurance[]> {
    return this.insuranceService.getInsurances(insurancesFilterDto, user);
  }

  // not an authenticated endpoint yet
  // TODO: create another user type: admin who has access to this endpoint
  // for now just let anyone create an insurance it to proceed with the exercise
  @Post()
  createInsurance(@Body() insuranceDto: InsuranceDto) {
    return this.insuranceService.createInsurance(insuranceDto);
  }
}
