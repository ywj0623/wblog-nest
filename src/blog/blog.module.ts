import { Module } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogResolver } from './resolver/blog.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './entity/post.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
    ]),
  ],
  providers: [BlogService, BlogResolver],
  controllers: [],
})
export class BlogModule {}
