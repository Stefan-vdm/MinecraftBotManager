import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isPrivate } from 'ip';
import { Observable } from 'rxjs';

@Injectable()
export class LocalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return isPrivate(request.ip);
  }
}
