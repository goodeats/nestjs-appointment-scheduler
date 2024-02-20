import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfile(@GetUser() user: User) {
    return this.profileService.getProfile(user);
  }

  @Post()
  createProfile(@Body() userProfileDto: UserProfileDto, @GetUser() user: User) {
    return this.profileService.createProfile(userProfileDto, user);
  }

  @Patch()
  updateProfile(@Body() userProfileDto: UserProfileDto, @GetUser() user: User) {
    return this.profileService.updateProfile(userProfileDto, user);
  }
}
