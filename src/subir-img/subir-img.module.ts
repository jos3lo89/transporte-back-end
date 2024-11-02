import { Module } from '@nestjs/common';
import { SubirImgController } from './subir-img.controller';
import { SubirImgService } from './subir-img.service';

@Module({
  controllers: [SubirImgController],
  providers: [SubirImgService]
})
export class SubirImgModule {}
