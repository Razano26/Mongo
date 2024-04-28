import { Controller, Get } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Bar } from './bar/schemas/bar.schema';
import { Restaurant } from './restaurant/schemas/restaurant.schema';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async getAll(): Promise<(Bar | Restaurant)[]> {
    return this.placesService.getAll();
  }
}