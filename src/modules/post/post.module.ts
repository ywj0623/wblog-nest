import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostService } from 'src/services/post/post.service'
import { PostResolver } from 'src/resolvers/post/post.resolver'
import { Post, PostSchema } from 'src/entity/post.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  providers: [PostService, PostResolver],
  controllers: [],
})
export class PostModule {}
