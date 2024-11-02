import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { CredencialesService } from 'src/credenciales/credenciales.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private credencialesService: CredencialesService,
  ) {}

  async create(data: RegisterDto) {
    try {
      const findUser = await this.prismaService.empleados.findFirst({
        where: {
          OR: [{ email: data.email }, { num_documento: data.num_documento }],
        },
      });

      if (findUser && findUser.email === data.email) {
        throw new HttpException('El correo ya está en uso', HttpStatus.BAD_REQUEST);
      }

      if (findUser && findUser.num_documento === data.num_documento) {
        throw new HttpException('El número de documento ya está en uso', HttpStatus.BAD_REQUEST);
      }

      const newUser = await this.prismaService.empleados.create({
        data: {
          ...data,
          fecha_nacimiento: new Date(data.fecha_nacimiento),
        },
      });

      const password = Date.now().toString();

      await this.prismaService.credenciales.create({
        data: {
          clave: await bcrypt.hash(password, 10),
          usuario: newUser.num_documento.toString(),
          empleado_id: newUser.id,
        },
      });

      this.credencialesService.sendMail(newUser.email, newUser.num_documento.toString(), password);

      return newUser;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al registrar al usuario', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(data: LoginDto) {
    try {
      const findUser = await this.prismaService.credenciales.findFirst({
        where: {
          usuario: data.usuario,
        },
        include: {
          empleado: true,
        },
      });

      return findUser;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al buscar el usuario', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
