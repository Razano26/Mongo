// brand.controller.ts
import { Controller, Get } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Pub } from '../../schemas/Pub.schema';
import { Bar } from '../../schemas/Bar.schema';
import { Restaurant } from '../../schemas/Restaurant.schema';
import { Fast_Food } from '../../schemas/Fast_food.schema';

@Controller('brand') // Pour accéder à cette route, il faudra taper http://localhost:3000/brand
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAllWithBrand(): Promise<(Pub | Bar | Restaurant | Fast_Food)[]> {
    return this.brandService.findAllWithBrand();
  }
}
