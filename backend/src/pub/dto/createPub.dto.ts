import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePubDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;
}
