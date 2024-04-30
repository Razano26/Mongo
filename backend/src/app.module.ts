import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BarsModule } from './bar/bars.module';
import { RestaurantsModule } from './restaurant/restaurants.module';
import { PubsModule } from './pub/pubs.module';
import { Fast_FoodsModule } from './fast_food/fast_food.module';
import { BrandModule } from './aggregate/brand/brand.module';
import { SportModule } from './aggregate/sport/sport.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        dbName: 'mtp_open_data',
      },
    ),
    AuthModule,
    UsersModule,
    BarsModule,
    RestaurantsModule,
    PubsModule,
    Fast_FoodsModule,
    BrandModule,
    SportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
