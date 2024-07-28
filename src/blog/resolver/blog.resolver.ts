import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BlogService } from '../blog.service'
import { Post } from '../entity/post.entity'
import { CreatePostDTO } from './dto/createPost.dto'
import { UpdatePostDTO } from './dto/updatePost.dto'
import { Schema as MongooseSchema } from 'mongoose'

@Resolver(() => Post)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Post], {
    name: 'posts',
  })
  getPosts() {
    return this.blogService.getPosts()
  }

  @Query(() => Post, {
    name: 'postById',
  })
  getPost(
    @Args('id', {
      type: () => String,
    })
    id: MongooseSchema.Types.ObjectId,
  ) {
    return this.blogService.getPost(id)
  }

  @Mutation(() => Post)
  addPost(@Args('createPostDTO') createPostDTO: CreatePostDTO) {
    return this.blogService.addPost(createPostDTO)
  }

  @Mutation(() => Post)
  editPost(@Args('updatePostDTO') updatePostDTO: UpdatePostDTO) {
    return this.blogService.editPost(updatePostDTO._id, updatePostDTO)
  }

  @Mutation(() => Post)
  deletePost(
    @Args('id', {
      type: () => String,
    })
    id: MongooseSchema.Types.ObjectId,
  ) {
    return this.blogService.deletePost(id)
  }
}
