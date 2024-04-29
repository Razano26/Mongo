import { IsOptional, IsString } from 'class-validator';

export class PatchRestaurantDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  brand: string;
}
