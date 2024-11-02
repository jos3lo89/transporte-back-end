import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistroConductorDto } from './dto/registro.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ConductoresService {
  constructor(private prismaService: PrismaService) {}

  async registra(data: RegistroConductorDto) {
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

      return nuevoConductor;
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
      const lista = await this.prismaService.conductores.findMany();
      return lista;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Erro al registrar conductor', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
