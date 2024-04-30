import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Pub } from '../schemas/Pub.schema';
import { CreatePubDto } from './dto/createPub.dto';
import { PatchPubDto } from './dto/patchPub.dto';
import { PubsService } from './pubs.service';

@Controller('pubs')
export class PubsController {
  constructor(private readonly pubsService: PubsService) {}

  @Post() // Route pour créer un pub : http://localhost:3000/pubs
  async create(@Body() createPubDto: CreatePubDto) {
    return await this.pubsService.create(createPubDto);
  }

  @Patch(':id') // Route pour mettre à jour un pub par son id : http://localhost:3000/pubs/{id}
  async update(@Param('id') id: string, @Body() patchPubDto: PatchPubDto) {
    return await this.pubsService.update(id, patchPubDto);
  }

  @Get() // Route pour récupérer tous les pubs : http://localhost:3000/pubs
  async findAll(): Promise<Pub[]> {
    return await this.pubsService.findAll();
  }

  @Get('with-brand') // Route pour récupérer tous les pubs qui ont une marque : http://localhost:3000/pubs/with-brand
  async findAllWithBrand(): Promise<Pub[]> {
    return await this.pubsService.findAllWithBrand();
  }

  @Get('with-sport') // Route pour récupérer tous les pubs qui propose un sport : http://localhost:3000/bars/with-sport
  async findAllWithSport(): Promise<Pub[]> {
    return await this.pubsService.findAllWithSport();
  }

  @Get(':name') // Route pour récupérer un pub par son nom : http://localhost:3000/pubs/{name}
  async findByName(@Param('name') name: string): Promise<Pub[]> {
    return await this.pubsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un pub par son id : http://localhost:3000/pubs/{id}
  async delete(@Param('id') id: string) {
    return await this.pubsService.delete(id);
  }
}
