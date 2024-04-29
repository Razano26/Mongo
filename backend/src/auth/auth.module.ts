import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'piloupilou',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
})
export class AuthModule {}
