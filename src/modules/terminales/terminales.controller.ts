import { Body, Controller, Get, Post } from '@nestjs/common';
import { TerminalesService } from './terminales.service';
import { UbicacionTerminalDto } from './dto/registrar.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';

@Controller('terminales')
export class TerminalesController {
  constructor(private terminalService: TerminalesService) {}

  @Post()
  @Auth(Role.GERENTE)
  create(@Body() body: UbicacionTerminalDto) {
    return this.terminalService.create(body);
  }

  @Get()
  @Auth(Role.GERENTE)
  listaTerminales() {
    return this.terminalService.listaTerminales();
  }
}
