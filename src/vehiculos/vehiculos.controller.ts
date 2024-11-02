import { Body, Controller, Get, Post } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RegistrarVehiculoDto } from './dto/registrar.dto';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private vehiculoService: VehiculosService) {}

  @Post()
  @Auth(Role.ADMINISTRADOR)
  registrar(@Body() body: RegistrarVehiculoDto) {
    return this.vehiculoService.registrar(body);
  }

  @Get()
  @Auth(Role.ADMINISTRADOR)
  listaVehiuclos() {
    return this.vehiculoService.listaVehiculos();
  }
}
