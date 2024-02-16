import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: DoctorsRepository,
  ) {}
}
