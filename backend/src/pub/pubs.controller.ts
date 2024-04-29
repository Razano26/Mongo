import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PubsService } from './pubs.service';
import { Pub } from '../schemas/Pub.schema';
import { CreatePubDto } from './dto/createPub.dto';
import { PatchPubDto } from './dto/patchPub.dto';

@Controller('pubs')
export class PubsController {
  constructor(private readonly pubsService: PubsService) {}

  @Post() // Route pour créer un pub : http://localhost:3000/pubs
  async create(@Body() createPubDto: CreatePubDto) {
    await this.pubsService.create(createPubDto);
  }

  @Patch(':id') // Route pour mettre à jour un pub par son id : http://localhost:3000/pubs/{id}
  async update(@Param('id') id: string, @Body() patchPubDto: PatchPubDto) {
    return this.pubsService.update(id, patchPubDto);
  }

  @Get() // Route pour récupérer tous les pubs : http://localhost:3000/pubs
  async findAll(): Promise<Pub[]> {
    return this.pubsService.findAll();
  }

  @Get(':name') // Route pour récupérer un pub par son nom : http://localhost:3000/pubs/{name}
  async findByName(@Param('name') name: string): Promise<Pub[]> {
    return this.pubsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un pub par son id : http://localhost:3000/pubs/{id}
  async delete(@Param('id') id: string) {
    return this.pubsService.delete(id);
  }
}
