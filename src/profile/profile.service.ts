import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';

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

  async createProfile(userProfileDto: UserProfileDto, user: User) {
    const found = await this.profileRepository.getProfile(user);

    if (found) {
      throw new ConflictException('Profile already exists');
    }

    return await this.profileRepository.createProfile(userProfileDto, user);
  }

  async updateProfile(userProfileDto: UserProfileDto, user: User) {
    const profile = await this.profileRepository.getProfile(user);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return await this.profileRepository.updateProfile(userProfileDto, profile);
  }
}
