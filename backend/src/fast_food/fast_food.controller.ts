import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Fast_Food } from '../schemas/Fast_food.schema';
import { Fast_FoodsService } from './fast_food.service';

import { CreateFast_FoodDto } from './dto/createFast_food.dto';
import { PatchFast_FoodDto } from './dto/patchFast_food.dto';

@Controller('fast_food')
export class Fast_FoodsController {
  constructor(private readonly fast_foodsService: Fast_FoodsService) {}

  @Post() // Route pour créer un fast_food : http://localhost:3000/fast_food
  async create(@Body() createFast_FoodDto: CreateFast_FoodDto) {
    return await this.fast_foodsService.create(createFast_FoodDto);
  }

  @Patch(':id') // Route pour mettre à jour un fast_food par son id : http://localhost:3000/fast_food/{id}
  async update(
    @Param('id') id: string,
    @Body() patchFast_FoodDto: PatchFast_FoodDto,
  ) {
    return this.fast_foodsService.update(id, patchFast_FoodDto);
  }

  @Get() // Route pour récupérer tous les fast_foods : http://localhost:3000/fast_food
  async findAll(): Promise<Fast_Food[]> {
    return await this.fast_foodsService.findAll();
  }

  @Get('with-brand') // Route pour récupérer tous les fast food qui ont une marque : http://localhost:3000/fast_food/with-brand
  async findAllWithBrand(): Promise<Fast_Food[]> {
    return await this.fast_foodsService.findAllWithBrand();
  }

  @Get('with-sport') // Route pour récupérer tous les fast food qui propose un sport : http://localhost:3000/fast_food/with-sport
  async findAllWithSport(): Promise<Fast_Food[]> {
    return await this.fast_foodsService.findAllWithSport();
  }

  @Get(':name') // Route pour récupérer un fast_food par son nom : http://localhost:3000/fast_food/{name}
  async findByName(@Param('name') name: string): Promise<Fast_Food[]> {
    return await this.fast_foodsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un fast_food par son id : http://localhost:3000/fast_food/{id}
  async delete(@Param('id') id: string) {
    return this.fast_foodsService.delete(id);
  }
}
