import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.get<string>('NODE_ENV');
export const APP_PORT = configService.get<number>('APP_PORT');
export const APP_VERSION = configService.get<string>('APP_VERSION') ?? '';
export const APP_VERSION_PREFIX =
  configService.get<string>('APP_VERSION_PREFIX') ?? '';
export const APP_CONTAINER_NAME =
  configService.get<string>('APP_CONTAINER_NAME');

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const JWT_SECRET = configService.get<string>('JWT_SECRET') ?? '';
export const JWT_SECRET_EXPIRES_IN = Number(
  configService.get<number>('JWT_SECRET_EXPIRES_IN')
);
export const JWT_REFRESH_EXPIRES_IN = Number(
  configService.get<number>('JWT_REFRESH_EXPIRES_IN')
);
export const IS_PUBLIC_KEY = 'isPublic';