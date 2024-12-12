import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Post()
  @Auth(Role.GERENTE, Role.BOLETERO)
  create(@Body() createPasajeroDto: CreatePasajeroDto) {
    return this.pasajerosService.create(createPasajeroDto);
  }

  @Get()
  @Auth(Role.GERENTE, Role.BOLETERO)
  findAll() {
    return this.pasajerosService.findAll();
  }

  @Get('detalles/:numAsiento/:idViaje')
  getDetallesDeAsiento(@Param('numAsiento') numAsiento: string, @Param('idViaje') idViaje: string) {
    return this.pasajerosService.getDetallesAsiento(numAsiento, idViaje);
  }

  /* asientos manejo */

  @Get('viaje/:id')
  @Auth(Role.GERENTE, Role.BOLETERO)
  traerVaijePorId(@Param('id') param: string) {
    return this.pasajerosService.traerVaijePorId(param);
  }
}
