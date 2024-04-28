import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BarsService } from './bars.service';
//import { CreateCatDto } from './dto/create-cat.dto';
import { Bar } from './schemas/bar.schema';

@Controller('bars')
export class BarsController {
  constructor(private readonly barsService: BarsService) {}

//   @Post()
//   async create(@Body() createCatDto: CreateCatDto) {
//     await this.catsService.create(createCatDto);
//   }

  @Get() // Route pour récupérer tous les bars : http://localhost:3000/bars
  async findAll(): Promise<Bar[]> {
    return this.barsService.findAll();
  }

  @Get(':name') // Route pour récupérer un bar par son nom : http://localhost:3000/bars/BarName
  async findByName(@Param('name') name: string): Promise<Bar[]> {
    return this.barsService.findByName(name);
  }

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.barsService.delete(id);
//   }
}