import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { RegisterDto } from '@auth/dto/register.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { Role } from '@auth/enums/rol.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authSerivice.login(body);
  }

  @Post('register')
  @Auth(Role.GERENTE)
  @UseInterceptors(FileInterceptor('file'))
  register(@Body() body: RegisterDto, @UploadedFile() file: Express.Multer.File) {
    return this.authSerivice.register(body, file);
  }
}
