import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '@auth/decorators/roles.decorator';
import { AuthGuard } from '@auth/guard/auth.guard';
import { RolesGuard } from '@auth/guard/roles.guard';
import { Role } from '@auth/enums/rol.enum';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
