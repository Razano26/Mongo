import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFast_FoodDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;
}
