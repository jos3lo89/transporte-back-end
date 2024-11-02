import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ViajesController],
  providers: [ViajesService, PrismaService],
})
export class ViajesModule {}
