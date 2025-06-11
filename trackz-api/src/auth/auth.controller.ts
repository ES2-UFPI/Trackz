import { Controller, Post, HttpCode, HttpStatus, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { AuthDto, RegisterDto } from './dto';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // NOVO ENDPOINT DE CADASTRO
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK) // Garante que o status de sucesso seja 200 OK
  @Post('login') // ENDPOINT DE LOGIN ATUALIZADO
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
