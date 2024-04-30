// brand.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SportService } from './sport.service';
import { Pub } from '../../schemas/Pub.schema';
import { Bar } from '../../schemas/Bar.schema';
import { Restaurant } from '../../schemas/Restaurant.schema';
import { Fast_Food } from '../../schemas/Fast_food.schema';

@Controller('sport') // Pour accéder à cette route, il faudra taper http://localhost:3000/sport
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  async findAllWithBrand(): Promise<(Pub | Bar | Restaurant | Fast_Food)[]> {
    return this.sportService.findAllWithSport();
  }
}