import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

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
  ],
  controllers: [],
  providers: [ProfileService],
})
export class AppModule {}
