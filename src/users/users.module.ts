import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredencialesService } from 'src/credenciales/credenciales.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CredencialesService]
})
export class UsersModule {}
