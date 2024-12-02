import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { SubirImgService } from '@common/libs/subir-img/subir-img.service';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Module({
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService, SubirImgService, CloudinaryService],
})
export class EmpresaModule {}
