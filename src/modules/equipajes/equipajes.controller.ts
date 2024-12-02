import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipajesService } from './equipajes.service';
import { CreateEquipajeDto } from './dto/create-equipaje.dto';
import { UpdateEquipajeDto } from './dto/update-equipaje.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';

@Controller('equipajes')
export class EquipajesController {
  constructor(private readonly equipajesService: EquipajesService) {}

  @Post()
  @Auth(Role.BOLETERO, Role.BOLETERO)
  create(@Body() createEquipajeDto: CreateEquipajeDto) {
    return this.equipajesService.create(createEquipajeDto);
  }

  @Get()
  @Auth(Role.BOLETERO, Role.BOLETERO)
  findAll() {
    return this.equipajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipajeDto: UpdateEquipajeDto) {
    return this.equipajesService.update(+id, updateEquipajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipajesService.remove(+id);
  }
}
