import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { InsuranceModule } from './insurance/insurance.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
