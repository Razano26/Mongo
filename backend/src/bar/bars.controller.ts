import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Bar } from '../schemas/Bar.schema';
import { BarsService } from './bars.service';
import { CreateBarDto } from './dto/createBar.dto';
import { PatchBarDto } from './dto/patchBar.dto';

@Controller('bars')
export class BarsController {
  constructor(private readonly barsService: BarsService) {}

  @Post() // Route pour créer un bar : http://localhost:3000/bars
  async create(@Body() createBarDto: CreateBarDto) {
    await this.barsService.create(createBarDto);
  }

  @Patch(':id') // Route pour mettre à jour un bar par son id : http://localhost:3000/bars/{id}
  async update(@Param('id') id: string, @Body() patchBarDto: PatchBarDto) {
    return this.barsService.update(id, patchBarDto);
  }

  @Get() // Route pour récupérer tous les bars : http://localhost:3000/bars
  async findAll(): Promise<Bar[]> {
    return this.barsService.findAll();
  }

  @Get('with-brand') // Route pour récupérer tous les bars qui ont une marque : http://localhost:3000/bars/with-brand
  async findAllWithBrand(): Promise<Bar[]> {
    return this.barsService.findAllWithBrand();
  }

  @Get('with-sport') // Route pour récupérer tous les bars qui propose un sport : http://localhost:3000/bars/with-sport
  async findAllWithSport(): Promise<Bar[]> {
    return this.barsService.findAllWithSport();
  }

  @Get(':name') // Route pour récupérer un bar par son nom : http://localhost:3000/bars/{name}
  async findByName(@Param('name') name: string): Promise<Bar[]> {
    return this.barsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un bar par son id : http://localhost:3000/bars/{id}
  async delete(@Param('id') id: string) {
    return this.barsService.delete(id);
  }
}
