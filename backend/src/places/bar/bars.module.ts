import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BarsService } from './bars.service';
import { BarsController } from './bars.controller';

import { Bar, BarSchema } from './schemas/bar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bar.name, schema: BarSchema },
    ]),
  ],
  controllers: [BarsController],
  providers: [BarsService],
})
export class BarsModule {}
