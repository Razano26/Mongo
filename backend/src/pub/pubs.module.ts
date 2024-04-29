import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubsController } from './pubs.controller';
import { PubsService } from './pubs.service';

import { Pub, PubSchema } from '../schemas/Pub.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pub.name, schema: PubSchema }])],
  controllers: [PubsController],
  providers: [PubsService],
})
export class PubsModule {}
