import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { ConflictException } from '@nestjs/common';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface DoctorsRepository extends Repository<Doctor> {
  this: Repository<Doctor>;
  createDoctor(
    authCredentialsDto: AuthCredentialsDto,
    createDoctorProfileDto: CreateDoctorProfileDto,
  ): Promise<void>;
}

export const customDoctorsRepository: Pick<DoctorsRepository, any> = {
  async createDoctor(
    authCredentialsDto: AuthCredentialsDto,
    createDoctorProfileDto: CreateDoctorProfileDto,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = this.create({
      email,
      password: hashedPassword,
      ...createDoctorProfileDto,
    });

    try {
      return this.save(doctor);
    } catch (error) {
      const duplicateEmail = error.code === '23505';
      if (duplicateEmail) {
        throw new ConflictException('Email already exists');
      } else {
        throw error;
      }
    }
  },
};
