import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from 'src/services/post/post.service'
import { Post } from 'src/entity/post.entity'
import { CreatePostDTO, UpdatePostDTO } from './dto/post.dto'
import { Schema as MongooseSchema } from 'mongoose'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guards/auth.guard'
import { UserPayload } from 'src/common/decorators/userPayload.decorator'

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

  @Mutation(() => Post, { name: 'createPost' })
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args() args: CreatePostDTO,
    @UserPayload() user: any, // Using any for user type for now
  ) {
    return this.postService.createPost(args, user.userId)
  }

  @Mutation(() => Post, { name: 'editPost' })
  @UseGuards(GqlAuthGuard)
  editPost(
    @Args() args: UpdatePostDTO,
    @UserPayload() user: any, // Using any for user type
  ) {
    return this.postService.editPost(args._id, args, user.userId)
  }

  @Mutation(() => Post, { name: 'deletePost' })
  @UseGuards(GqlAuthGuard)
  deletePost(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @UserPayload() user: any, // Using any for user type
  ) {
    return this.postService.deletePost(id, user.userId)
  }
}
