import { Module } from '@nestjs/common';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { Insurance } from './insurance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
