import { Controller, Get, Param } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  // Route pour récupérer toutes les places, indépendamment de leur type
  @Get()
  async getAllPlaces() {
    return await this.placesService.findAllPlaces();
  }

  // Route pour récupérer toutes les places d'un type spécifique
  @Get(':type')
  async getPlacesByType(@Param('type') type: string) {
    return await this.placesService.findPlacesByType(type);
  }
}
