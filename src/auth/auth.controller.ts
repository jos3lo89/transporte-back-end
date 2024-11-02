import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from './enums/rol.enum';

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authSerivice.login(body);
  }

  @Post('register')
  @Auth(Role.ADMINISTRADOR)
  register(@Body() body: RegisterDto) {
    return this.authSerivice.register(body);
  }
}
