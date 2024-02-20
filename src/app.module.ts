import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { InsuranceModule } from './insurance/insurance.module';
import { DoctorsInsuranceModule } from './doctors-insurance/doctors-insurance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs-appointment-scheduler',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    InsuranceModule,
    DoctorsInsuranceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
