import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtPayload } from './dto/jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {
    // https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
    super({
      secretOrKey: 'jwt-development-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
