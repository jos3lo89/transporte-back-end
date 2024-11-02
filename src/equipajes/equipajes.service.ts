import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipajeDto } from './dto/create-equipaje.dto';
import { UpdateEquipajeDto } from './dto/update-equipaje.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EquipajesService {
  constructor(private prismaService: PrismaService) {}

  async create(createEquipajeDto: CreateEquipajeDto) {
    try {
      const nuevoEquipaje = await this.prismaService.equipajes.create({
        data: createEquipajeDto,
      });

      return nuevoEquipaje;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registra el equipaje', HttpStatus.BAD_REQUEST);
      }
    }
  }

  findAll() {
    return `This action returns all equipajes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipaje`;
  }

  update(id: number, updateEquipajeDto: UpdateEquipajeDto) {
    return `This action updates a #${id} equipaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipaje`;
  }
}
