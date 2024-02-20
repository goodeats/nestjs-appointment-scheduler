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
    @InjectRepository(Profile) private profilesRepository: ProfilesRepository,
  ) {}

  async getProfile(user: User) {
    const found = await this.profilesRepository.getProfile(user);

    if (!found) {
      throw new NotFoundException('Profile not found');
    }

    return found;
  }

  async createProfile(userProfileDto: UserProfileDto, user: User) {
    const found = await this.profilesRepository.getProfile(user);

    if (found) {
      throw new ConflictException('Profile already exists');
    }

    return await this.profilesRepository.createProfile(userProfileDto, user);
  }

  async updateProfile(userProfileDto: UserProfileDto, user: User) {
    const profile = await this.profilesRepository.getProfile(user);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return await this.profilesRepository.updateProfile(userProfileDto, profile);
  }
}
