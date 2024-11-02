import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubirImgService } from 'src/subir-img/subir-img.service';

@Module({
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService, SubirImgService],
})
export class EmpresaModule {}
