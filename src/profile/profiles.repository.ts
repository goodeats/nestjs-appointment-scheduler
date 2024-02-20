import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface ProfilesRepository extends Repository<Profile> {
  this: Repository<Profile>;
  getProfile(user: User): Promise<Profile>;
  createProfile(userProfileDto: UserProfileDto, user: User): Promise<Profile>;
  updateProfile(
    userProfileDto: UserProfileDto,
    profile: Profile,
  ): Promise<Profile>;
}

export const customProfilesRepository: Pick<ProfilesRepository, any> = {
  async getProfile(user: User): Promise<Profile> {
    return this.findOne({ where: { user } });
  },

  async createProfile(
    userProfileDto: UserProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = this.create({
      ...userProfileDto,
      user,
    });

    return await this.save(profile);
  },

  async updateProfile(
    userProfileDto: UserProfileDto,
    profile: Profile,
  ): Promise<Profile> {
    return await this.save({ ...profile, ...userProfileDto });
  },
};
