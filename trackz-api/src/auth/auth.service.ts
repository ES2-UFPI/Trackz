// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service'; // Ajustado para caminho relativo
import * as bcrypt from 'bcryptjs';
import { AuthDto, RegisterDto } from './dto'; // 2. IMPORTE OS DTOs
import { User } from '@prisma/client'; // 1. IMPORTE O TIPO 'User'


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // NOVO MÉTODO PARA CADASTRAR USUÁRIOS
  async register(dto: RegisterDto) {
    // Verificar se email ou username já existem
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email ou nome de usuário já cadastrado.');
    }

    // Hashear a senha antes de salvar
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.senha, salt);

    // Criar usuário no banco de dados
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        nome: dto.nome,
        username: dto.username,
        senha: hashedPassword,
      },
    });

    // Retorna o usuário criado (sem a senha)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = user;
    return result;
  }

  // MÉTODO DE LOGIN ATUALIZADO
  async login(dto: AuthDto) {
    const user = await this.validateUser(dto.username, dto.senha);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // MÉTODO DE VALIDAÇÃO ATUALIZADO (antigo validarUsuario)
  async validateUser(username: string, pass: string): Promise<Omit<User, 'senha'> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(pass, user.senha))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }
}