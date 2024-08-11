import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from 'src/services/post/post.service'
import { Post } from 'src/entity/post.entity'
import { CreatePostDTO, UpdatePostDTO } from './dto/post.dto'
import { Schema as MongooseSchema } from 'mongoose'

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

  @Query(() => [Post], { name: 'postsByCategory' })
  getPostByCategory(@Args('categoryKey') categoryKey: string) {
    return this.postService.getPostsByCategory(categoryKey)
  }

  @Mutation(() => Post, { name: 'createPost' })
  createPost(@Args() args: CreatePostDTO) {
    return this.postService.createPost(args)
  }

  @Mutation(() => Post, { name: 'editPost' })
  editPost(@Args() args: UpdatePostDTO) {
    return this.postService.editPost(args._id, args)
  }

  @Mutation(() => Post, { name: 'deletePost' })
  deletePost(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.postService.deletePost(id)
  }
}
