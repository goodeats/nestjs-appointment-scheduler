import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetInsurancesFilterDto } from 'src/insurance/dto/get-insurances-filter.dto';
import { PatientsInsuranceService } from './patients-insurance.service';
import { CreatePatientInsuranceDto } from './dto/create-patient-insurance.dto';

@Controller('patients')
@UseGuards(AuthGuard())
export class PatientsInsuranceController {
  constructor(private patientsInsuranceService: PatientsInsuranceService) {}

  @Get('/insurance')
  getInsurancesByPatientId(
    @Query() insurancesFilterDto: GetInsurancesFilterDto,
    @GetUser() user: User,
  ) {
    return this.patientsInsuranceService.getInsurancesByPatientId(
      insurancesFilterDto,
      user,
    );
  }

  @Post('/insurance')
  createInsuranceByPatientId(
    @Body() createPatientInsuranceDto: CreatePatientInsuranceDto,
    @GetUser() user: User,
  ) {
    return this.patientsInsuranceService.createInsuranceByPatientId(
      createPatientInsuranceDto,
      user,
    );
  }
}
