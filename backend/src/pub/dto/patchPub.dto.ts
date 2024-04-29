import { IsOptional, IsString } from 'class-validator';

export class PatchPubDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}
