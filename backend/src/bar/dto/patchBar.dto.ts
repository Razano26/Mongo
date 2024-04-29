import { IsOptional, IsString } from 'class-validator';

export class PatchBarDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
