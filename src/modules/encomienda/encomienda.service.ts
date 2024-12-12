import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '@src/database/prisma/prisma.service';
import { CreateEncomiendaDto } from './dto/create.dto';
import { StateEcomiendaDto } from './dto/state.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncomiendaService {
  constructor(private prismaService: PrismaService) {}

  async getPackages(fecha: string) {
    try {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(fecha);

      if (!isValidDate) {
        throw new HttpException('Fecha no valida', HttpStatus.BAD_REQUEST);
      }

      const startOfDay = new Date(`${fecha}T00:00:00Z`);
      const endOfDay = new Date(`${fecha}T23:59:59Z`);

      const list = await this.prismaService.encomiendas.findMany({
        where: {
          fecha_hora_envio: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      return list;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw Error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al bucar las encmiendas', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  async register(data: CreateEncomiendaDto) {
    try {
      const codeHash = await bcrypt.hash(data.codigo_recogida, 10);

      const nuevaEncomienda = await this.prismaService.encomiendas.create({
        data: {
          ...data,
          codigo_recogida: codeHash,
        },
      });
      return nuevaEncomienda;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la encomienda', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listEncomiendas() {
    try {
      const list = await this.prismaService.encomiendas.findMany({
        include: {
          destino_terminal: true,
          origen_terminal: true,
        },
      });

      return list;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al listar las encomiendas', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async getWhitId(id: string) {
    try {
      const encomienda = await this.prismaService.encomiendas.findFirst({
        where: {
          id,
        },
        include: {
          destino_terminal: true,
          origen_terminal: true,
        },
      });
      return encomienda;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al buscar la encomienda', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async changeState(data: StateEcomiendaDto, id: string) {
    try {
      const encomindaFound = await this.prismaService.encomiendas.findFirst({
        where: {
          id,
        },
      });

      const isMatch = await bcrypt.compare(data.clave, encomindaFound.codigo_recogida);
      if (!isMatch) {
        throw new HttpException('La clave no coincide', HttpStatus.BAD_REQUEST);
      }

      const newEncomineda = await this.prismaService.encomiendas.update({
        where: {
          id,
        },
        data: {
          estado: data.state,
        },
      });

      return newEncomineda;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al modificar el estado de la encomienda', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
