// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestUtilsModule } from './test-utils/test-utils.module';

// 1. Crie o array de importações SEM o AppModule
const imports = [AuthModule, PrismaModule];

// 2. Adicione o módulo de teste condicionalmente
if (process.env.NODE_ENV === 'test') {
  imports.push(TestUtilsModule);
}

@Module({
  imports: imports, // 3. Use o array dinâmico que não contém AppModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}