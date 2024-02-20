import { Controller, Get } from '@nestjs/common';
import { InsuranceService } from './insurance.service';

// not an authenticated route yet
// TODO: create another user type: admin who has access to this route
// for now just let anyone access it to proceed with the exercise
@Controller('insurances')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}

  @Get()
  getInsurances() {
    return this.insuranceService.getInsurances();
  }
}
