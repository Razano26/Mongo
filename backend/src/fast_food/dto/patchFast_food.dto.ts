import { IsOptional, IsString } from 'class-validator';

export class PatchFast_FoodDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
