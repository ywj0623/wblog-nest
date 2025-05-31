import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    if (!request) {
      throw new UnauthorizedException('No request object found in context')
    }

    return request
  }

  handleRequest(err: any, user: any) {
    console.log('JwtGuard - handleRequest called with err:', err, 'user:', user)

    if (err || !user) {
      throw err || new UnauthorizedException('Authentication failed')
    }
    return user
  }
}
