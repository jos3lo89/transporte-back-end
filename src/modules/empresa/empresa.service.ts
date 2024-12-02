import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { RegistrarEmpresaDto } from './dto/empresa.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Injectable()
export class EmpresaService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async registro(data: RegistrarEmpresaDto, file: Express.Multer.File) {
    try {
      const empresaBusqueda = await this.prismaService.empresa.findFirst({
        where: {
          OR: [{ ruc: data.ruc }, { email: data.email }, { licencia_mtc: data.licencia_mtc }],
        },
      });

      if (empresaBusqueda && empresaBusqueda.ruc == data.ruc) {
        throw new HttpException('Este ruc ya esta registrado', HttpStatus.BAD_REQUEST);
      }
      if (empresaBusqueda && empresaBusqueda.email == data.email) {
        throw new HttpException('Este correo electronico ya esta registrado', HttpStatus.BAD_REQUEST);
      }
      if (empresaBusqueda && empresaBusqueda.licencia_mtc == data.licencia_mtc) {
        throw new HttpException('Esta licencia ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      const nuevaEmpresa = await this.prismaService.empresa.create({
        data: {
          ...data,
          fecha_licencia: new Date(data.fecha_licencia),
          fecha_fundacion: new Date(data.fecha_fundacion),
        },
      });

      const imagen = await this.cloudinaryService.subirImangen(file);

      const empresaWithImage = await this.prismaService.empresa.update({
        where: {
          id: nuevaEmpresa.id,
        },
        data: {
          logo_id: imagen.public_id,
          logo_url: imagen.url,
        },
      });

      return empresaWithImage;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la empresa', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async datosEmpresa(ruc: string) {
    try {
      const empresa = await this.prismaService.empresa.findFirst({ where: { ruc } });
      return empresa;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la empresa', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async borrarEmpresa(id: string) {
    try {
      const empresaBorrada = await this.prismaService.empresa.delete({
        where: {
          id,
        },
      });

      const imagenBorrada = await this.cloudinaryService.borraImagen(empresaBorrada.logo_id);

      return { ...empresaBorrada, imagenBorrada };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al borrar la empresa', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
