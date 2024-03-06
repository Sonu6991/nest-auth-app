import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/enum/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true; // No role required, allow access
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('user', user);
    if (!user || !user.roles) {
      return false; // User not authenticated or no role assigned
    }

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
