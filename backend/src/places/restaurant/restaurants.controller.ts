import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
//import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

//   @Post()
//   async create(@Body() createRestaurantDto: CreateRestaurantDto) {
//     await this.restaurantsService.create(createRestaurantDto);
//   }

@Get() // Route pour récupérer tous les restaurants : http://localhost:3000/restaurants
async findAll(): Promise<Restaurant[]> {
  return this.restaurantsService.findAll();
}

@Get(':name') // Route pour récupérer un restaurant par son nom : http://localhost:3000/restaurants/RestaurantName
async findByName(@Param('name') name: string): Promise<Restaurant[]> {
  return this.restaurantsService.findByName(name);
}

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.restaurantsService.delete(id);
//   }
}