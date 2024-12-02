import { Module } from '@nestjs/common';
import { TerminalesController } from './terminales.controller';
import { TerminalesService } from './terminales.service';
import { PrismaService } from '@database/prisma/prisma.service';

@Module({
  controllers: [TerminalesController],
  providers: [TerminalesService, PrismaService],
})
export class TerminalesModule {}
