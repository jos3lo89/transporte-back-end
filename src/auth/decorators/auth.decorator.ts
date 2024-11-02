import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from '../enums/rol.enum';

export function Auth(...roles: Role[]) {
  // return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
