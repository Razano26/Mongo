import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Bar, BarSchema } from '../schemas/Bar.schema';
import { BarsController } from './bars.controller';
import { BarsService } from './bars.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bar.name, schema: BarSchema }])],
  controllers: [BarsController],
  providers: [BarsService],
  exports: [BarsService],
})
export class BarsModule {}
