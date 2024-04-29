import { Body,Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';
import { Restaurant } from '../schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { PatchRestaurantDto } from './dto/patch-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post() // Route pour créer un restaurant : http://localhost:3000/restaurants
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    await this.restaurantsService.create(createRestaurantDto);
  }

  @Patch(':id') // Route pour mettre à jour un restaurant par son id : http://localhost:3000/restaurants/{id}
  async update(@Param('id') id: string, @Body() patchRestaurantDto: PatchRestaurantDto,
  ) {
    return this.restaurantsService.update(id, patchRestaurantDto);
  }

  @Get() // Route pour récupérer tous les restaurants : http://localhost:3000/restaurants
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':name') // Route pour récupérer un restaurant par son nom : http://localhost:3000/restaurants/{name}
  async findByName(@Param('name') name: string): Promise<Restaurant[]> {
    return this.restaurantsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un restaurant par son id : http://localhost:3000/restaurants/{id}
  async delete(@Param('id') id: string) {
    return this.restaurantsService.delete(id);
  }
}
