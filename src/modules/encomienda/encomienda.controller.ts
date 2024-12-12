import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EncomiendaService } from './encomienda.service';
import { CreateEncomiendaDto } from './dto/create.dto';
import { StateEcomiendaDto } from './dto/state.dto';

@Controller('encomienda')
export class EncomiendaController {
  constructor(private ecomiendaService: EncomiendaService) {}

  @Get('por-fecha/:fecha')
  listingpackages(@Param('fecha') param: string) {
    return this.ecomiendaService.getPackages(param);
  }

  @Post()
  register(@Body() body: CreateEncomiendaDto) {
    return this.ecomiendaService.register(body);
  }

  @Get()
  listEncomiendas() {
    return this.ecomiendaService.listEncomiendas();
  }

  @Get('por-id/:id')
  getWithId(@Param('id') param: string) {
    return this.ecomiendaService.getWhitId(param);
  }

  @Put('change-state/:id')
  changeState(@Param('id') param: string, @Body() body: StateEcomiendaDto) {
    return this.ecomiendaService.changeState(body, param);
  }
}
