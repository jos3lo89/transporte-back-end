import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  @Post()
  @Auth(Role.GERENTE, Role.BOLETERO)
  create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajesService.create(createViajeDto);
  }

  @Get()
  @Auth(Role.GERENTE, Role.BOLETERO)
  findAll() {
    return this.viajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viajesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViajeDto: UpdateViajeDto) {
    return this.viajesService.update(+id, updateViajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viajesService.remove(+id);
  }
}
