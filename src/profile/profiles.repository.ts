import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface ProfilesRepository extends Repository<Profile> {
  this: Repository<Profile>;
  getProfile(user: User): Promise<Profile>;
}

export const customProfilesRepository: Pick<ProfilesRepository, any> = {
  async getProfile(user: User): Promise<Profile> {
    return this.findOne({ where: { user } });
  },
};
