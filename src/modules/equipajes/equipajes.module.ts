import { Module } from '@nestjs/common';
import { EquipajesService } from './equipajes.service';
import { EquipajesController } from './equipajes.controller';
import { PrismaService } from '@database/prisma/prisma.service';

@Module({
  controllers: [EquipajesController],
  providers: [EquipajesService, PrismaService],
})
export class EquipajesModule {}
