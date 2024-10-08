import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Restaurant } from '../schemas/Restaurant.schema';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { PatchRestaurantDto } from './dto/patchRestaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post() // Route pour créer un restaurant : http://localhost:3000/restaurants
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantsService.create(createRestaurantDto);
  }

  @Patch(':id') // Route pour mettre à jour un restaurant par son id : http://localhost:3000/restaurants/{id}
  async update(
    @Param('id') id: string,
    @Body() patchRestaurantDto: PatchRestaurantDto,
  ) {
    return await this.restaurantsService.update(id, patchRestaurantDto);
  }

  @Get() // Route pour récupérer tous les restaurants : http://localhost:3000/restaurants
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantsService.findAll();
  }

  @Get('with-brand') // Route pour récupérer tous les restaurants qui ont une marque : http://localhost:3000/restaurants/with-brand
  async findAllWithBrand(): Promise<Restaurant[]> {
    return await this.restaurantsService.findAllWithBrand();
  }

  @Get('with-sport') // Route pour récupérer tous les restaurant qui propose un sport : http://localhost:3000/restaurants/with-sport
  async findAllWithSport(): Promise<Restaurant[]> {
    return await this.restaurantsService.findAllWithSport();
  }

  @Get(':name') // Route pour récupérer un restaurant par son nom : http://localhost:3000/restaurants/{name}
  async findByName(@Param('name') name: string): Promise<Restaurant[]> {
    return await this.restaurantsService.findByName(name);
  }

  @Delete(':id') // Route pour supprimer un restaurant par son id : http://localhost:3000/restaurants/{id}
  async delete(@Param('id') id: string) {
    return await this.restaurantsService.delete(id);
  }
}
