import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser, Public } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dtos';
import { LocalAuthGuard } from '~/common/guards';
import { RefreshTokenAuthGuard } from '~/common/guards/refresh-token-auth.guard';
import { UserPayload } from '~/common/interfaces';
import { AuthService } from './auth.service';
import {
  AuthRefreshRequestDTO,
  AuthRefreshResponseDTO,
  AuthRequestDTO,
  AuthResponseDTO
} from './dto';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: AuthResponseDTO })
  @ApiBody({ type: AuthRequestDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@GetUser() user: UserPayload) {
    try {
      const response = await this.authService.login(user);
      return AuthResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(RefreshTokenAuthGuard)
  @ApiCreatedResponse({ type: AuthRefreshResponseDTO })
  @ApiBody({ type: AuthRefreshRequestDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@GetUser() user: UserPayload) {
    try {
      const response = await this.authService.refreshToken(user);
      return AuthRefreshResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
