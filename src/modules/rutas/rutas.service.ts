import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { RegistrarRutaDto } from './dto/registrar.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RutasService {
  constructor(private prismaService: PrismaService) {}

  async registra(data: RegistrarRutaDto) {
    try {
      const nuevaRuta = await this.prismaService.rutas.create({
        data,
      });

      return nuevaRuta;
    } catch (error) {
      console.log(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar', HttpStatus.BAD_GATEWAY);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listaRutas() {
    try {
      const lista = await this.prismaService.rutas.findMany({
        include: {
          origen: true,
          destino: true,
        },
      });
      return lista;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al listar las rutas', HttpStatus.BAD_GATEWAY);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listRoutesForAndahuaylas() {
    try {
      const list = await this.prismaService.rutas.findMany({
        include: {
          origen: true,
          destino: true,
        },
      });

      return list.filter((ruta) => ruta.origen.ciudad === 'Andahuaylas');
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al listar las rutas', HttpStatus.BAD_GATEWAY);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
