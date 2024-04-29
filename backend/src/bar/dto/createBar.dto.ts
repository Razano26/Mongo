import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBarDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;
}
