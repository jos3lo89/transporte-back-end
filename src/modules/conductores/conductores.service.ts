import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { RegistroConductorDto } from './dto/registro.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Injectable()
export class ConductoresService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async registra(data: RegistroConductorDto, file: Express.Multer.File) {
    try {
      const conductorBusqueda = await this.prismaService.conductores.findFirst({
        where: {
          num_documento: data.num_documento,
          email: data.email,
          licencia: data.licencia,
        },
      });

      if (conductorBusqueda && conductorBusqueda.num_documento == data.num_documento) {
        throw new HttpException('El número de documento ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      if (conductorBusqueda && conductorBusqueda.email == data.email) {
        throw new HttpException('El correo elctronico ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      if (conductorBusqueda && conductorBusqueda.licencia == data.licencia) {
        throw new HttpException('La licencia ya esta registrada', HttpStatus.BAD_REQUEST);
      }

      const nuevoConductor = await this.prismaService.conductores.create({
        data: {
          ...data,
          fecha_nacimiento: new Date(data.fecha_nacimiento),
        },
      });

      const imagen = await this.cloudinaryService.subirImangen(file);

      const conductorActual = await this.prismaService.conductores.update({
        where: {
          id: nuevoConductor.id,
        },
        data: {
          foto_id: imagen.public_id,
          foto_url: imagen.url,
        },
      });

      return conductorActual;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Erro al registrar conductor', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listaCoductores() {
    try {
      const lista = await this.prismaService.conductores.findMany({
        where: { estado: 'ACTIVO' },
        include: {
          vehiculo: true,
        },
      });
      return lista;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Erro al registrar conductor', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listDriversAllState() {
    try {
      const lista = await this.prismaService.conductores.findMany({
        include: {
          vehiculo: true,
        },
      });
      return lista;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al listar toso los conductores', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }


  async changeState(id: string, estado: 'INACTIVO' | 'ACTIVO') {
    try {
      const result = await this.prismaService.conductores.update({
        where: {
          id,
        },
        data: {
          estado,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al actualizar el estado', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
