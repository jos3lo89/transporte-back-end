import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { CredencialesService } from '@modules/credenciales/credenciales.service';
import { PrismaService } from '@database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private credencialesService: CredencialesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(data: RegisterDto, file: Express.Multer.File) {
    try {
      console.log('user service ->', data, file);

      /* --- verifcar empleado --- */
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

      /* --- creando credenciales  --- */
      const password = Date.now().toString();

      await this.prismaService.credenciales.create({
        data: {
          clave: await bcrypt.hash(password, 10),
          usuario: newUser.num_documento.toString(),
          empleado_id: newUser.id,
        },
      });

      /* --- enviando las credenciales credenciales  --- */
      this.credencialesService.sendMail(newUser.email, newUser.num_documento.toString(), password);

      /* --- Actualizadno al empleado / usuario con su foto  --- */
      const imagen = await this.cloudinaryService.subirImangen(file);

      const userUpdated = await this.prismaService.empleados.update({
        where: {
          id: newUser.id,
        },
        data: {
          foto_id: imagen.public_id,
          foto_url: imagen.url,
        },
      });

      return userUpdated;
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

  async listaEmpleados() {
    try {
      const lista = await this.prismaService.empleados.findMany();
      return lista;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Error al listar empleados', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
