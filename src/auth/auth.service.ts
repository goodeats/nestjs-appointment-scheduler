import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorsRepository } from './doctors.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { DoctorSignupDto } from './dto/doctor-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: DoctorsRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(doctorSignupDto: DoctorSignupDto): Promise<void> {
    return await this.doctorsRepository.createDoctor(doctorSignupDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const doctor = await this.doctorsRepository.getByEmail(email);
    console.log('doctor', doctor);
    if (doctor && (await bcrypt.compare(password, doctor.password))) {
      console.log('here');
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
