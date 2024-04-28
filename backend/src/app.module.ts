import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      { dbName: 'mtp_open_data' },
    ),
    AuthModule,
    UsersModule,
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
