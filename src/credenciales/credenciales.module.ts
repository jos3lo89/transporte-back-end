import { Module } from '@nestjs/common';
import { CredencialesController } from './credenciales.controller';
import { CredencialesService } from './credenciales.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CredencialesController],
  providers: [CredencialesService, PrismaService]
})
export class CredencialesModule {}
