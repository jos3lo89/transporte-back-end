import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@database/prisma/prisma.service';
import { CredencialesService } from '@modules/credenciales/credenciales.service';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CredencialesService, CloudinaryService],
})
export class UsersModule {}
