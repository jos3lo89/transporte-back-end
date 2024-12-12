import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/database/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  async allData() {
    try {
      const viajesTatal = await this.prismaService.viajes.aggregate({
        _sum: {
          precio: true,
        },
      });

      const encomiendasTotal = await this.prismaService.encomiendas.aggregate({
        _sum: {
          precio_total: true,
        },
      });

      const viajesTatales = await this.prismaService.viajes.findMany();
      const encomiendasTatoles = await this.prismaService.encomiendas.findMany();
      const catidadVehiculos = await this.prismaService.vehiculos.findMany();
      const cantidadPersonal = await this.prismaService.empleados.findMany();

      return {
        gananciaTotalViaje: viajesTatal._sum.precio,
        gananciaTotalEncomienda: encomiendasTotal._sum.precio_total,
        cantidadDeViajes: viajesTatales.length,
        cantidadEncomiendas: encomiendasTatoles.length,
        cantidadVehiculos: catidadVehiculos.length,
        cantidadPersonal: cantidadPersonal.length,
      };
    } catch (error) {
      console.error('Error al calcular el total de la plata:', error);
      throw error; // Maneja el error según sea necesario
    }
  }
}
