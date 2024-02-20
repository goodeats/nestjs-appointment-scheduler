import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import { Insurance } from 'src/insurance/insurance.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { ConflictException } from '@nestjs/common';

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
  getInsurances(profile: Profile): Promise<Insurance[]>;
  addDoctorInsurance(profile: Profile, insurance: Insurance): Promise<void>;
  addPatientInsurance(profile: Profile, insurance: Insurance): Promise<void>;
  getAppointments(profile: Profile): Promise<Appointment[]>;
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

  async getInsurances(profile: Profile): Promise<Insurance[]> {
    const profileWithInsurance = await this.findOne({
      where: { id: profile.id },
      relations: { insurances: true },
    });
    return profileWithInsurance.insurances;
  },

  async addDoctorInsurance(
    profile: Profile,
    insurance: Insurance,
  ): Promise<void> {
    const profileWithInsurance = await this.findOne({
      where: { id: profile.id },
      relations: { insurances: true },
    });

    // check if insurance already exists on profile
    const profileInsuranceAlreadyExists = profileWithInsurance.insurances.some(
      (existingInsurance) => existingInsurance.id === insurance.id,
    );
    if (profileInsuranceAlreadyExists) {
      throw new ConflictException('Profile already has this insurance');
    }

    profileWithInsurance.insurances.push(insurance);
    return await this.save(profileWithInsurance);
  },

  async addPatientInsurance(
    profile: Profile,
    insurance: Insurance,
  ): Promise<void> {
    const profileWithInsurance = await this.findOne({
      where: { id: profile.id },
      relations: { insurances: true },
    });

    // check if insurance already exists on profile
    const profileInsuranceAlreadyExists =
      profileWithInsurance.insurances.length > 0;
    if (profileInsuranceAlreadyExists) {
      throw new ConflictException('Patient already has insurance');
    }

    profileWithInsurance.insurances.push(insurance);
    return await this.save(profileWithInsurance);
  },

  async getAppointments(profile: Profile): Promise<Appointment[]> {
    const profileWithAppointments = await this.findOne({
      where: { id: profile.id },
      relations: { appointments: true },
    });
    return profileWithAppointments.appointments;
  },
};
