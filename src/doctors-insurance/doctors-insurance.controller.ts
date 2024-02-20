import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoctorsInsuranceService } from './doctors-insurance.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetInsurancesFilterDto } from 'src/insurance/dto/get-insurances-filter.dto';
import { CreateDoctorInsuranceDto } from './dto/create-doctor-insurance.dto';

@Controller('doctors')
@UseGuards(AuthGuard())
export class DoctorsInsuranceController {
  constructor(private doctorsInsuranceService: DoctorsInsuranceService) {}

  @Get('/insurances')
  getInsurancesByDoctorId(
    @Query() insurancesFilterDto: GetInsurancesFilterDto,
    @GetUser() user: User,
  ) {
    return this.doctorsInsuranceService.getInsurancesByDoctorId(
      insurancesFilterDto,
      user,
    );
  }

  @Post('/insurances')
  createInsuranceByDoctorId(
    @Body() createDoctorInsuranceDto: CreateDoctorInsuranceDto,
    @GetUser() user: User,
  ) {
    return this.doctorsInsuranceService.createInsuranceByDoctorId(
      createDoctorInsuranceDto,
      user,
    );
  }
}
