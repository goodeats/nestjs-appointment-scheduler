import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorsRepository } from './doctors.repository';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Doctor)
    private usersRepository: DoctorsRepository,
  ) {
    // https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
    super({
      secretOrKey: 'jwt-development-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<Doctor> {
    const { email } = payload;
    const doctor = await this.usersRepository.getByEmail(email);

    if (!doctor) {
      throw new UnauthorizedException();
    }

    return doctor;
  }
}
