// src/test-utils/test-utils.controller.ts
import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('test-utils')
export class TestUtilsController {
  constructor(private prisma: PrismaService) {}

  @Post('cleanup')
  async cleanup() {
    // Deleta usuários criados pelo teste.
    // Usamos 'contains' para não deletar usuários reais por acidente.
    await this.prisma.user.deleteMany({
      where: {
        email: {
          contains: '@exemplo.com',
        },
      },
    });
    return { message: 'Banco de dados de teste limpo.' };
  }
}