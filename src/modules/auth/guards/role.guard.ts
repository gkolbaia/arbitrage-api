import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class RolesGuard implements CanActivate {
  constructor(public allowRoles: string[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.roles || !user.roles.length) {
      return false;
    }
    if (this.checkRoles(user.roles, this.allowRoles)) return true;
    return false;
  }
  private checkRoles(userRoles: string[], allowRoles: string[]): boolean {
    for (const allowed of allowRoles) {
      if (userRoles.indexOf(allowed) !== -1) {
        return true;
      }
    }
    return false;
  }
}
