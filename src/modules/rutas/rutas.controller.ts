import { Body, Controller, Get, Post } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { RegistrarRutaDto } from './dto/registrar.dto';

@Controller('rutas')
export class RutasController {
  constructor(private rutasService: RutasService) {}

  @Post()
  @Auth(Role.GERENTE)
  registrar(@Body() body: RegistrarRutaDto) {
    console.log(body);

    return this.rutasService.registra(body);
  }

  @Get()
  @Auth(Role.GERENTE)
  listaRutas() {
    return this.rutasService.listaRutas();
  }

  @Get('andahuaylas')
  @Auth(Role.GERENTE)
  listRoutesForAndahuaylas() {
    return this.rutasService.listRoutesForAndahuaylas();
  }
}
