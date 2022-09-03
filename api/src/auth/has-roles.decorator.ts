import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
