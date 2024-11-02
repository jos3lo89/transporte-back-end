import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PasajerosService {
  constructor(private prismaService: PrismaService) {}

  async create(createPasajeroDto: CreatePasajeroDto) {
    try {
      const pasajeroBusqueda = await this.prismaService.pasajeros.findFirst({
        where: {
          viaje_id: createPasajeroDto.viaje_id,
        },
      });

      if (pasajeroBusqueda) {
        throw new HttpException('El pasajero ya esta en este viaje', HttpStatus.BAD_REQUEST);
      }

      const nuevoPasajero = await this.prismaService.pasajeros.create({
        data: createPasajeroDto,
      });

      return nuevoPasajero;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
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

  findOne(id: number) {
    return `This action returns a #${id} pasajero`;
  }

  update(id: number, updatePasajeroDto: UpdatePasajeroDto) {
    return `This action updates a #${id} pasajero`;
  }

  remove(id: number) {
    return `This action removes a #${id} pasajero`;
  }
}
