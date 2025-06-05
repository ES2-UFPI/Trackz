import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';


@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('login')
async login(@Body() body: { usuario: string; senha: string }) {
  const user = await this.authService.validarUsuario(body.usuario, body.senha);
  if (!user) {
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }

  return this.authService.login(user);
}
}
