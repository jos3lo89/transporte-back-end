import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { PrismaService } from '@database/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ViajesService {
  constructor(private prismaService: PrismaService) {}

  async create(createViajeDto: CreateViajeDto) {
    try {
      const nuevoViaje = await this.prismaService.viajes.create({
        data: {
          ...createViajeDto,
          fecha: new Date(createViajeDto.fecha),
        },
      });

      await this.prismaService.vehiculos.update({
        where: {
          id: createViajeDto.vehiculo_id,
        },
        data: {
          estado: 'INACTIVO',
        },
      });

      await this.prismaService.conductores.update({
        where: {
          id: createViajeDto.conductor_id,
        },
        data: {
          estado: 'INACTIVO',
        },
      });

      return nuevoViaje;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al crear el viaje', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    try {
      const lista = await this.prismaService.viajes.findMany({
        include: {
          vehiculo: true,
          ruta: {
            include: {
              origen: true,
              destino: true,
            },
          },
        },
      });
      return lista;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al crear el viaje', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(id: string) {
    try {
      const viaje = await this.prismaService.viajes.findFirst({
        where: {
          id,
        },

        include: {
          vehiculo: {
            include: {
              conductor: true,
            },
          },
          ruta: {
            include: {
              destino: true,
              origen: true,
            },
          },
        },
      });

      return viaje;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al buscar el viaje', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del sevidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return `This action updates a #${id} viaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaje`;
  }
}
