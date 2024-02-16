import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Body() createDoctorProfileDto: CreateDoctorProfileDto,
  ) {
    return this.authService.signUp(authCredentialsDto, createDoctorProfileDto);
  }
}
