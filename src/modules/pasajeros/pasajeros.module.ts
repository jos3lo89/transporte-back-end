import { Module } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { PasajerosController } from './pasajeros.controller';
import { PrismaService } from '@database/prisma/prisma.service';

@Module({
  controllers: [PasajerosController],
  providers: [PasajerosService, PrismaService],
})
export class PasajerosModule {}
