import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    try {
      const userFound = await this.userService.findOne(data);

      if (!userFound) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const isPasswordValid = await bcrypt.compare(data.clave, userFound.clave);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Correo o contraseña no coinciden');
      }

      const payload = {
        id: userFound.id,
        name: userFound.empleado.nombres,
        role: userFound.empleado.rol,
        email: userFound.empleado.email,
      };

      const token = await this.jwtService.signAsync(payload);

      // const {} = userFound.empleado

      return { ...userFound.empleado, token };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al iniciar sesion el usuario', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async register(data: RegisterDto) {
    return await this.userService.create(data);
  }
}
