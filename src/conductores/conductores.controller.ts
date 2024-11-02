import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RegistroConductorDto } from './dto/registro.dto';
import { ConductoresService } from './conductores.service';

@Controller('conductores')
export class ConductoresController {
  constructor(private conductorService: ConductoresService) {}

  @Post()
  @Auth(Role.ADMINISTRADOR)
  registrar(@Body() body: RegistroConductorDto) {
    return this.conductorService.registra(body);
  }

  @Get()
  @Auth(Role.ADMINISTRADOR)
  listaConductores() {
    return this.conductorService.listaCoductores();
  }
}
