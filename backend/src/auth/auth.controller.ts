import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.loginUser(authPayload);
  }

  @Get('status')
  status(@Req() req: Request) {
    return req.user;
  }

  @Public()
  @Post('register')
  register(@Body() authPayload: AuthPayloadDto) {
    return this.authService.register(authPayload);
  }
}
