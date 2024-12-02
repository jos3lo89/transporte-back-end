import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '@database/prisma/prisma.service';
import { UbicacionTerminalDto } from './dto/registrar.dto';

@Injectable()
export class TerminalesService {
  constructor(private prismaService: PrismaService) {}

  async create(data: UbicacionTerminalDto) {
    try {
      const terminales = await this.prismaService.ubicacionTerminal.findFirst({
        where: {
          ciudad: data.ciudades,
        },
      });

      if (terminales && terminales.ciudad == data.ciudades) {
        throw new HttpException('la ciudad ya esta registrada', HttpStatus.BAD_REQUEST);
      }

      const nuevoTerminal = await this.prismaService.ubicacionTerminal.create({
        data: {
          ciudad: data.ciudades,
        },
      });

      return nuevoTerminal;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la terminal', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error iterno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listaTerminales() {
    try {
      const lista = await this.prismaService.ubicacionTerminal.findMany();
      return lista;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la terminal', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error iterno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
