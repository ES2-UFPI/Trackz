import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validarUsuario(usuario: string, senha: string): Promise<any> {
    // Usuário fake por enquanto
    const fakeUser = {
      usuario: 'ovo_de_pascoa',
      senha: await bcrypt.hash('chocolate', 10), // use hash real em produção
    };

    const senhaValida = await bcrypt.compare(senha, fakeUser.senha);
    if (usuario === fakeUser.usuario && senhaValida) {
      return { usuario: fakeUser.usuario };
    }

    return null;
  }

  async login(user: any) {
    const payload = { usuario: user.usuario };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
