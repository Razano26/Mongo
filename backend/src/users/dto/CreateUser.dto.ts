import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @IsBoolean()
  @IsOptional()
  receiveEmails?: boolean;

  @IsBoolean()
  active?: boolean;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;
}
