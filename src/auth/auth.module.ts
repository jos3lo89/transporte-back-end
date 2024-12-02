import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@database/prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';
import { CredencialesService } from '@modules/credenciales/credenciales.service';
import { jwtConstants } from '@auth/constants/jwt.constant';
import { CloudinaryService } from '@src/common/libs/cloudinary/cloudinary.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, CredencialesService, CloudinaryService],
})
export class AuthModule {}
