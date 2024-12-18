import { Module } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';
import { PrismaService } from '@database/prisma/prisma.service';

@Module({
  controllers: [BoletosController],
  providers: [BoletosService, PrismaService],
})
export class BoletosModule {}
