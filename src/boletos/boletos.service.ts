import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BoletosService {
  constructor(private prismaService: PrismaService) {}

  async create(createBoletoDto: CreateBoletoDto) {
    try {
      const nuevaBoleta = await this.prismaService.boletos.create({
        data: createBoletoDto,
      });

      return nuevaBoleta;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar la boleta', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  findAll() {
    return `This action returns all boletos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boleto`;
  }

  update(id: number, updateBoletoDto: UpdateBoletoDto) {
    return `This action updates a #${id} boleto`;
  }

  remove(id: number) {
    return `This action removes a #${id} boleto`;
  }
}
