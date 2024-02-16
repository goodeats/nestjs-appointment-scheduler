import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorsRepository } from './doctors.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: DoctorsRepository,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    createDoctorDto: CreateDoctorDto,
  ): Promise<void> {
    return await this.doctorsRepository.createDoctor(
      authCredentialsDto,
      createDoctorDto,
    );
  }
}
