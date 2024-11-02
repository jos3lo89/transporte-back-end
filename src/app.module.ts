import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmpresaModule } from './empresa/empresa.module';
import { TerminalesModule } from './terminales/terminales.module';
import { CredencialesModule } from './credenciales/credenciales.module';
import { ConductoresModule } from './conductores/conductores.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { RutasModule } from './rutas/rutas.module';
import { ViajesModule } from './viajes/viajes.module';
import { PasajerosModule } from './pasajeros/pasajeros.module';
import { EquipajesModule } from './equipajes/equipajes.module';
import { BoletosModule } from './boletos/boletos.module';
import { SubirImgModule } from './subir-img/subir-img.module';

@Module({
  imports: [AuthModule, UsersModule, EmpresaModule, TerminalesModule, CredencialesModule, ConductoresModule, VehiculosModule, RutasModule, ViajesModule, PasajerosModule, EquipajesModule, BoletosModule, SubirImgModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
