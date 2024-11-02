import { Body, Controller, Get, Post } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RegistrarRutaDto } from './dto/registrar.dto';

@Controller('rutas')
export class RutasController {
  constructor(private rutasService: RutasService) {}

  @Post()
  @Auth(Role.ADMINISTRADOR)
  registrar(@Body() body: RegistrarRutaDto) {
    return this.rutasService.registra(body);
  }

  @Get()
  @Auth(Role.ADMINISTRADOR)
  listaRutas() {
    return this.rutasService.listaRutas();
  }
}
