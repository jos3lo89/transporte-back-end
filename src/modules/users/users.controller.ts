import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '@src/auth/decorators/auth.decorator';
import { Role } from '@src/auth/enums/rol.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Auth(Role.GERENTE)
  listaEmpleados() {
    return this.userService.listaEmpleados();
  }
}
