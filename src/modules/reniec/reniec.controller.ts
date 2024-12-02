import { Controller, Get, Param } from '@nestjs/common';
import { ReniecService } from './reniec.service';

@Controller('reniec')
export class ReniecController {
  constructor(private reniecService: ReniecService) {}

  @Get(':dni')
  getData(@Param('dni') dni: string) {
    console.log(dni);

    return this.reniecService.getingData(dni);
  }
}
