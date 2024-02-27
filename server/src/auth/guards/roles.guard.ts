// guards/roles.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole, UserPermission, RolePermissions } from '../enum/permissions.enum'; // Import UserRole and UserPermission enums

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<UserPermission[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No specific permissions required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole: UserRole = user.role; // Assuming user object contains role information

    if (!userRole) {
      return false; // If user role is not defined, deny access
    }

    // Get the permissions associated with the user's role
    const userPermissions: UserPermission[] = RolePermissions[userRole];

    if (!userPermissions) {
      return false; // If no permissions are defined for the user's role, deny access
    }

    // Check if the user has all of the required permissions
    const hasRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

    return hasRequiredPermissions;
  }
}
