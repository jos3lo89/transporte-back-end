import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { PrismaService } from '@database/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PasajerosService {
  constructor(private prismaService: PrismaService) {}

  async create(createPasajeroDto: CreatePasajeroDto) {
    try {
      const pasajeroBusqueda = await this.prismaService.pasajeros.findFirst({
        where: {
          AND: [{ viaje_id: createPasajeroDto.viaje_id }, { num_documento: createPasajeroDto.num_documento }],
        },
      });

      if (pasajeroBusqueda) {
        throw new HttpException('El pasajero ya esta en este viaje', HttpStatus.BAD_REQUEST);
      }

      const {} = createPasajeroDto;

      const nuevoPasajero = await this.prismaService.pasajeros.create({
        data: {
          apellidos: createPasajeroDto.apellidos,
          destino: createPasajeroDto.destino,
          nombres: createPasajeroDto.nombres,
          num_asiento: createPasajeroDto.num_asiento,
          num_documento: createPasajeroDto.num_documento,
          tipo_documento: createPasajeroDto.tipo_documento,
          viaje_id: createPasajeroDto.viaje_id,
        },
      });

      if (createPasajeroDto.peso_equipaje && createPasajeroDto.descripcion_equipaje) {
        await this.prismaService.equipajes.create({
          data: {
            descripcion: createPasajeroDto.descripcion_equipaje,
            peso_kilo: createPasajeroDto.peso_equipaje,
            pasajero_id: nuevoPasajero.id,
          },
        });
      }

      await this.prismaService.asientosVendidos.create({
        data: {
          num_asiento: nuevoPasajero.num_asiento,
          pasajero_id: nuevoPasajero.id,
          viaje_id: nuevoPasajero.viaje_id,
        },
      });

      return nuevoPasajero;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('El asiento ya está ocupado para este viaje', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Error al registrar pasajero', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    try {
      const lista = await this.prismaService.pasajeros.findMany({
        include: {
          viaje: {
            include: {
              ruta: {
                include: {
                  origen: true,
                  destino: true,
                },
              },
            },
          },
        },
      });

      return lista;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar pasajero', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  /* Traer siento de viaje */

  async traerVaijePorId(id: string) {
    try {
      const asientos = await this.prismaService.asientosVendidos.findMany({
        where: {
          viaje_id: id,
        },
      });
      return asientos;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar pasajero', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getDetallesAsiento(numAsiento: string, idViaje: string) {
    try {
      const res = await this.prismaService.asientosVendidos.findFirst({
        where: {
          num_asiento: Number(numAsiento),
          viaje_id: idViaje,
        },
        include: {
          pasajero: {
            include: {
              equipaje: true,
            },
          },
          viaje: {
            include: {
              ruta: {
                include: {
                  destino: true,
                  origen: true,
                },
              },
            },
          },
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al buscar el asiento', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
