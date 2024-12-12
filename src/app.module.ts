import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { EmpresaModule } from '@modules/empresa/empresa.module';
import { TerminalesModule } from '@modules/terminales/terminales.module';
import { CredencialesModule } from '@modules/credenciales/credenciales.module';
import { ConductoresModule } from '@modules/conductores/conductores.module';
import { VehiculosModule } from '@modules/vehiculos/vehiculos.module';
import { RutasModule } from '@modules/rutas/rutas.module';
import { ViajesModule } from '@modules/viajes/viajes.module';
import { PasajerosModule } from '@modules/pasajeros/pasajeros.module';
import { EquipajesModule } from '@modules/equipajes/equipajes.module';
import { BoletosModule } from '@modules/boletos/boletos.module';
import { SubirImgModule } from '@libs/subir-img/subir-img.module';
import { CloudinaryModule } from '@libs/cloudinary/cloudinary.module';
import { ReniecModule } from './modules/reniec/reniec.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EncomiendaModule } from './modules/encomienda/encomienda.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    EmpresaModule,
    TerminalesModule,
    CredencialesModule,
    ConductoresModule,
    VehiculosModule,
    RutasModule,
    ViajesModule,
    PasajerosModule,
    EquipajesModule,
    BoletosModule,
    SubirImgModule,
    CloudinaryModule,
    ReniecModule,
    DashboardModule,
    EncomiendaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
