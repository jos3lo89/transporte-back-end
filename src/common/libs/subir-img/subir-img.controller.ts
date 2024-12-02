import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SubirImgService } from '@common/libs/subir-img/subir-img.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
});

@Controller('subir-img')
export class SubirImgController {
  constructor(private imgService: SubirImgService) {}

  @Post('upload')
  @Auth(Role.GERENTE, Role.BOLETERO)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async subirImagen(@UploadedFile() file: Express.Multer.File) {
    return {
      id: file.filename,
      url: file.path,
    };
  }

  @Get()
  @Auth(Role.GERENTE, Role.BOLETERO)
  async listarImagenes() {
    return await this.imgService.ListaImagenes();
  }

  @Get('transportes/:id')
  @Auth(Role.GERENTE, Role.BOLETERO)
  async traerImagen(@Param('id') param: string) {
    return await this.imgService.imagenPorId(param);
  }

  @Delete(':id')
  @Auth(Role.GERENTE, Role.BOLETERO)
  async borrarImagen(@Param('id') param: string) {
    return await this.imgService.borrarImagen(param);
  }
}
