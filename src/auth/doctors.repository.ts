import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { ConflictException } from '@nestjs/common';
import { DoctorSignupDto } from './dto/doctor-signup.dto';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface DoctorsRepository extends Repository<Doctor> {
  this: Repository<Doctor>;
  getByEmail(email: string): Promise<Doctor>;
  createDoctor(doctorSignupDto: DoctorSignupDto): Promise<void>;
}

export const customDoctorsRepository: Pick<DoctorsRepository, any> = {
  async getByEmail(email: string): Promise<Doctor> {
    return this.findOne({ where: { email } });
  },

  async createDoctor(doctorSignupDto: DoctorSignupDto): Promise<void> {
    const { password, ...createDoctorProfile } = doctorSignupDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = this.create({
      password: hashedPassword,
      ...createDoctorProfile,
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
