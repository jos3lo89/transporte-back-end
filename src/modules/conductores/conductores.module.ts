import { Module } from '@nestjs/common';
import { ConductoresController } from './conductores.controller';
import { ConductoresService } from './conductores.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Module({
  controllers: [ConductoresController],
  providers: [ConductoresService, PrismaService, CloudinaryService],
})
export class ConductoresModule {}
