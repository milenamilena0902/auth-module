import { Body, Controller, Post, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { LoginDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';

@Controller('auth')
@ApiTags('auth') // Group API routes under 'auth' section
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ schema: { example: { username: 'test', password: 'test' } } })
  @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Body() LoginDto) {
    const user = await this.authService.validateUser(LoginDto.username, LoginDto.password);
    if (!user) {
      return { status: 'error', message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({ schema: { example: { username: 'newuser', password: 'newpassword' } } })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  async register(@Body() RegisterDto) {
    return this.authService.register(RegisterDto.username, RegisterDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findOne(): UserEntity {
    return new UserEntity({
      id: 1,
      username: 'kelia09',
      password: 'password',
    })
  }
}