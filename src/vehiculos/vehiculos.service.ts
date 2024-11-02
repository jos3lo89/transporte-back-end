import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrarVehiculoDto } from './dto/registrar.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class VehiculosService {
  constructor(private prismaService: PrismaService) {}

  async registrar(data: RegistrarVehiculoDto) {
    try {
      const vehiculoBusqueda = await this.prismaService.vehiculos.findFirst({
        where: {
          OR: [
            { tarjeta_de_circulacion: data.tarjeta_de_circulacion },
            { numero_de_placa: data.numero_de_placa },
            { numero_motor: data.numero_motor },
            { conductor_id: data.conductor_id },
          ],
        },
      });

      console.log('0', vehiculoBusqueda);

      if (vehiculoBusqueda && vehiculoBusqueda.tarjeta_de_circulacion == data.tarjeta_de_circulacion) {
        console.log('1 targeta ');

        throw new HttpException('La targeta de ciruclación ya esta registrada', HttpStatus.BAD_REQUEST);
      }

      if (vehiculoBusqueda && vehiculoBusqueda.numero_de_placa == data.numero_de_placa) {
        console.log('2 numer o placa ');

        throw new HttpException('El número de placa ya esta registrada', HttpStatus.BAD_REQUEST);
      }

      if (vehiculoBusqueda && vehiculoBusqueda.numero_motor == data.numero_motor) {
        console.log('3 numero de mortor ');

        throw new HttpException('El número de motor ya esta registrado', HttpStatus.BAD_REQUEST);
      }

      if (vehiculoBusqueda && vehiculoBusqueda.conductor_id == data.conductor_id) {
        console.log('3 conduictor id ');

        throw new HttpException('El conductor ya esta asignado a un vehiculo', HttpStatus.BAD_REQUEST);
      }

      const nuevoVehiculo = await this.prismaService.vehiculos.create({
        data,
      });

      return nuevoVehiculo;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar el vehiculo', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async listaVehiculos() {
    try {
      const lista = await this.prismaService.vehiculos.findMany();
      return lista;
    } catch (error) {
      console.log(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar el vehiculo', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
