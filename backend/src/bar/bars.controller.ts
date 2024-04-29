import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BarsService } from './bars.service';
import { Bar } from '../schemas/Bar.schema';
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

  @Get(':name') // Route pour récupérer un bar par son nom : http://localhost:3000/bars/{name}
  async findByName(@Param('name') name: string): Promise<Bar[]> {
    return this.barsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un bar par son id : http://localhost:3000/bars/{id}
  async delete(@Param('id') id: string) {
    return this.barsService.delete(id);
  }
}
