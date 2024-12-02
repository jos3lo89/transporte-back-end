import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { RegistrarVehiculoDto } from './dto/registrar.dto';
import { StateDto } from './dto/changeState.dto';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private vehiculoService: VehiculosService) {}

  @Post()
  @Auth(Role.GERENTE)
  registrar(@Body() body: RegistrarVehiculoDto) {
    return this.vehiculoService.registrar(body);
  }

  @Get()
  @Auth(Role.GERENTE, Role.BOLETERO)
  listaVehiuclos() {
    return this.vehiculoService.listaVehiculos();
  }

  @Get("all-state")
  @Auth(Role.GERENTE, Role.BOLETERO)
  listVehiclesAllState() {
    return this.vehiculoService.listVehiclesAllState();
  }

  @Put('change-state/:id')
  @Auth(Role.GERENTE)
  changeState(@Param('id') param: string, @Body() body: StateDto) {
    const { state } = body;
    return this.vehiculoService.changeState(param, state);
  }
}
