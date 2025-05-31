import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from 'src/services/post/post.service'
import { Post } from 'src/entity/post.entity'
import { CreatePostDTO, UpdatePostDTO } from './dto/post.dto'
import { Schema as MongooseSchema } from 'mongoose'
import { UseGuards } from '@nestjs/common'
import { UserPayload } from 'src/common/decorators/userPayload.decorator'
import { UserPayloadDTO } from 'src/resolvers/auth/dto/user.dto'
import { GqlJwtGuard } from 'src/common/guards/gql-jwt.guard'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'allPosts' })
  getPosts() {
    return this.postService.getAllPosts()
  }

  @Query(() => Post, { name: 'singlePostById' })
  getPost(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.postService.getSinglePost(id)
  }

  @Query(() => [Post], { name: 'postsByTypeAndKey' })
  getPostByTypeAndKey(
    @Args('type') type: string,
    @Args('categoryKey')
    categoryKey: string,
  ) {
    return this.postService.getPostsByTypeAndKey(type, categoryKey)
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Post, { name: 'createPost' })
  createPost(@Args() args: CreatePostDTO, @UserPayload() user: UserPayloadDTO) {
    return this.postService.createPost(args, user._id)
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Post, { name: 'editPost' })
  editPost(@Args() args: UpdatePostDTO, @UserPayload() user: UserPayloadDTO) {
    return this.postService.editPost(args._id, args, user._id)
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => Post, { name: 'deletePost' })
  deletePost(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId, @UserPayload() user: UserPayloadDTO) {
    return this.postService.deletePost(id, user._id)
  }
}
