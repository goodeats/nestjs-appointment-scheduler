import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common';
import { UserType } from './user-type.enum';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// Creating and Using Custom Repositories in NestJS with TypeORM 0.3
// https://tech.durgadas.in/creating-and-using-custom-repositories-in-nestjs-with-typeorm-0-3-c7ac9548ad99
// this was actually really helpful, esp with registering in the module

export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
  getByEmail(email: string): Promise<User>;
  createUser(
    authCredentialsDto: AuthCredentialsDto,
    type: UserType,
  ): Promise<void>;
}

export const customUsersRepository: Pick<UsersRepository, any> = {
  async getByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  },

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
    type: UserType,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashedPassword,
      type,
    });

    try {
      await this.save(user);
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
