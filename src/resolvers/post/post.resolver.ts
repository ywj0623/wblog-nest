import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from 'src/services/post/post.service'
import { Post } from 'src/entity/post.entity'
import { CreatePostDTO } from './dto/createPost.dto'
import { UpdatePostDTO } from './dto/updatePost.dto'
import { Schema as MongooseSchema } from 'mongoose'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'allPost' })
  getPosts() {
    return this.postService.getPosts()
  }

  @Query(() => Post, { name: 'postById' })
  getPost(
    @Args('id', { type: () => String })
    id: MongooseSchema.Types.ObjectId,
  ) {
    return this.postService.getPost(id)
  }

  @Mutation(() => Post, { name: 'addPost' })
  addPost(@Args() args: CreatePostDTO) {
    return this.postService.addPost(args)
  }

  @Mutation(() => Post, { name: 'editPost' })
  editPost(@Args() args: UpdatePostDTO) {
    return this.postService.editPost(args._id, args)
  }

  @Mutation(() => Post, { name: 'deletePost' })
  deletePost(
    @Args('id', { type: () => String })
    id: MongooseSchema.Types.ObjectId,
  ) {
    return this.postService.deletePost(id)
  }
}
