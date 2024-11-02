import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RegistrarEmpresaDto } from './dto/empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}

  @Post()
  @Auth(Role.ADMINISTRADOR)
  registrar(@Body() body: RegistrarEmpresaDto) {
    return this.empresaService.registro(body);
  }

  @Get(':ruc')
  @Auth(Role.ADMINISTRADOR, Role.VENDEDOR)
  datosEmpresa(@Param('ruc') param: string) {
    return this.empresaService.datosEmpresa(param);
  }
}
