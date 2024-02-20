import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // separate signup endpoints for doctors and patients
  // sets the type of user

  @Post('/doctors/signup')
  signUpDoctor(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUpDoctor(authCredentialsDto);
  }

  @Post('/patients/signup')
  signUpPatient(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUpPatient(authCredentialsDto);
  }

  // shared signin endpoint
  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}
