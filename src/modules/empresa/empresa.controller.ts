import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { RegistrarEmpresaDto } from './dto/empresa.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('empresa')
export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}

  @Post()
  @Auth(Role.GERENTE)
  @UseInterceptors(FileInterceptor('file'))
  registrar(@Body() body: RegistrarEmpresaDto, @UploadedFile() file: Express.Multer.File) {
    return this.empresaService.registro(body, file);
  }

  @Get(':ruc')
  @Auth(Role.GERENTE, Role.BOLETERO)
  datosEmpresa(@Param('ruc') param: string) {
    return this.empresaService.datosEmpresa(param);
  }

  @Delete(':id')
  @Auth(Role.GERENTE, Role.BOLETERO)
  borrarEmpresa(@Param('id') param: string) {
    return this.empresaService.borrarEmpresa(param);
  }
}
