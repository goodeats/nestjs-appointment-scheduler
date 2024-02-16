import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.authService.signUp(authCredentialsDto, createDoctorDto);
  }
}
