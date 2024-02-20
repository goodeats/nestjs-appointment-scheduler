import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { DataSource } from 'typeorm';
import { customProfilesRepository } from './profiles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AuthModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    {
      provide: getRepositoryToken(Profile),
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Profile).extend(customProfilesRepository),
    },
  ],
})
export class ProfileModule {}
