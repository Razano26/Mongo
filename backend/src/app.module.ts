import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      { dbName: 'mtp_open_data' },
    ),
    UsersModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
