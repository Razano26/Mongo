import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private placeService: PlacesService) {}

  @Get() // Route pour récupérer tous les lieux : http://localhost:3000/place
  async findAll() {
    try {
      const data = await this.placeService.findAll();
      return {
        statusCode: 200,
        message: 'Data retrieved successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':name') // Route pour rechercher un lieu par son nom : http://localhost:3000/place/name
  async findPlaceByName(@Param('name') name: string) {
    if (!name) {
      throw new HttpException(
        'Name parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.placeService.findPlaceByName(name);
  }

  @Get(':brand') // Route pour récupérer les lieux avec une marque : http://localhost:3000/place/brand
  async findPlaceIfBrand3() {
    try {
      console.log('findPlaceIfBrand3');
      const data = await this.placeService.findPlaceIfBrand3();
      return {
        statusCode: 200,
        message: 'Data retrieved successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
