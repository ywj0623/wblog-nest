import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class TokenResolver {
  @Query(() => String, { name: 'getToken' })
  getToken(@Args('userId') userId: string): string {
    // This is a placeholder implementation. Replace with actual token generation logic.
    return `token-for-user-${userId}`
  }
}
