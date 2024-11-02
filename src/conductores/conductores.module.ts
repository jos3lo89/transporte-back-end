import { Module } from '@nestjs/common';
import { ConductoresController } from './conductores.controller';
import { ConductoresService } from './conductores.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ConductoresController],
  providers: [ConductoresService, PrismaService]
})
export class ConductoresModule {}
