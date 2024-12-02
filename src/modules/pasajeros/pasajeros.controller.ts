import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasajerosService } from './pasajeros.service';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
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

  /* asientos manejo */

  @Get('viaje/:id')
  @Auth(Role.GERENTE, Role.BOLETERO)
  traerVaijePorId(@Param('id') param: string) {
    return this.pasajerosService.traerVaijePorId(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasajerosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasajeroDto: UpdatePasajeroDto) {
    return this.pasajerosService.update(+id, updatePasajeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasajerosService.remove(+id);
  }
}
