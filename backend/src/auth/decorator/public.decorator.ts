import { Injectable, SetMetadata } from '@nestjs/common';

@Injectable()
export class AppService {}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
