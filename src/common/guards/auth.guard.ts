import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const args = ctx.getArgs()
    const request = ctx.getContext().req

    // 將 GraphQL 的參數轉換為 passport-local 期望的格式
    request.body = {
      email: args.email,
      password: args.password,
    }

    return request
  }
}
