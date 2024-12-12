import { Module } from '@nestjs/common';
import { EncomiendaController } from './encomienda.controller';
import { EncomiendaService } from './encomienda.service';
import { PrismaService } from '@src/database/prisma/prisma.service';

@Module({
  controllers: [EncomiendaController],
  providers: [EncomiendaService, PrismaService]
})
export class EncomiendaModule {}
