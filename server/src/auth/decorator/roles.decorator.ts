
import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../enum/permissions.enum';

export const Roles = (...roles: UserPermission[]) => SetMetadata('roles', roles);
