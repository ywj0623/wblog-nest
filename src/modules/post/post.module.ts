import { Module } from '@nestjs/common'
import { PostService } from 'src/services/post/post.service'
import { PostResolver } from 'src/resolvers/post/post.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from 'src/entity/post.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
    ]),
  ],
  providers: [PostService, PostResolver],
  controllers: [],
})
export class PostModule {}
