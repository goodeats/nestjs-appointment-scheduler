import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { UserType } from './user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUpDoctor(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const type = UserType.DOCTOR;
    return await this.usersRepository.createUser(authCredentialsDto, type);
  }

  async signUpPatient(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const type = UserType.PATIENT;
    return await this.usersRepository.createUser(authCredentialsDto, type);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
