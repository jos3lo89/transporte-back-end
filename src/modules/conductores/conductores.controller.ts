import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { RegistroConductorDto } from './dto/registro.dto';
import { ConductoresService } from './conductores.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StateDto } from './dto/changeState.dto';

@Controller('conductores')
export class ConductoresController {
  constructor(private conductorService: ConductoresService) {}

  @Post()
  @Auth(Role.GERENTE)
  @UseInterceptors(FileInterceptor('file'))
  registrar(@Body() body: RegistroConductorDto, @UploadedFile() file: Express.Multer.File) {
    return this.conductorService.registra(body, file);
  }

  @Get()
  @Auth(Role.GERENTE)
  listaConductores() {
    return this.conductorService.listaCoductores();
  }

  @Get('all-state')
  @Auth(Role.GERENTE)
  listDriversAllState() {
    return this.conductorService.listDriversAllState();
  }

  @Put('change-state/:id')
  @Auth(Role.GERENTE)
  changeState(@Param('id') param: string, @Body() body: StateDto) {
    const { state } = body;
    return this.conductorService.changeState(param, state);
  }
}
