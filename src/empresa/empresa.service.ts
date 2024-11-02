import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrarEmpresaDto } from './dto/empresa.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EmpresaService {
  constructor(private prismaService: PrismaService) {}

  async registro(data: RegistrarEmpresaDto) {
    try {
      const nuevaEmpresa = await this.prismaService.empresa.create({
        data: {
          ...data,
          fecha_licencia: new Date(data.fecha_licencia),
          fecha_fundacion: new Date(data.fecha_fundacion),
        },
      });

      return nuevaEmpresa;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
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
}
