import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: ProfilesRepository,
  ) {}

  async getProfile(user: User) {
    const found = await this.profileRepository.getProfile(user);

    if (!found) {
      throw new NotFoundException('Profile not found');
    }

    return found;
  }
}
