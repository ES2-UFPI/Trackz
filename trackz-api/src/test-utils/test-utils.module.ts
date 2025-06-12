// src/test-utils/test-utils.module.ts
import { Module } from '@nestjs/common';
import { TestUtilsController } from './test-utils.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TestUtilsController],
})
export class TestUtilsModule {}