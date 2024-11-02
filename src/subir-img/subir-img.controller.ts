import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SubirImgService } from './subir-img.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
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
  @Auth(Role.ADMINISTRADOR, Role.VENDEDOR)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async subirImagen(@UploadedFile() file: Express.Multer.File) {
    return {
      id: file.filename,
      url: file.path,
    };
  }

  @Get()
  @Auth(Role.ADMINISTRADOR, Role.VENDEDOR)
  async listarImagenes() {
    return await this.imgService.ListaImagenes();
  }

  @Get(':id')
  @Auth(Role.ADMINISTRADOR, Role.VENDEDOR)
  async traerImagen(@Param('id') param: string) {
    return await this.imgService.imagenPorId(param);
  }

  @Delete(':id')
  @Auth(Role.ADMINISTRADOR, Role.VENDEDOR)
  async borrarImagen(@Param('id') param: string) {
    return await this.imgService.borrarImagen(param);
  }
}
