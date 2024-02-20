import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoctorsInsuranceService } from './doctors-insurance.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetInsurancesFilterDto } from 'src/insurance/dto/get-insurances-filter.dto';

@Controller('doctors')
@UseGuards(AuthGuard())
export class DoctorsInsuranceController {
  constructor(private doctorsInsuranceService: DoctorsInsuranceService) {}

  @Get('/:id/insurances')
  getInsurancesByDoctorId(
    @Query() insurancesFilterDto: GetInsurancesFilterDto,
    @GetUser() user: User,
  ) {
    return this.doctorsInsuranceService.getInsurancesByDoctorId(
      insurancesFilterDto,
      user,
    );
  }
}
