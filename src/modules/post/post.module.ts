import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostService } from 'src/services/post/post.service'
import { PostResolver } from 'src/resolvers/post/post.resolver'
import { Post, PostSchema } from 'src/entity/post.entity'
import { StaticDataModule } from '../staticData/staticData.module'
import { StaticDataService } from 'src/services/staticData/staticData.service'
import { StaticDataResolver } from 'src/resolvers/staticData/staticData.resolver'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    StaticDataModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  providers: [PostService, PostResolver, StaticDataService, StaticDataResolver],
  controllers: [],
})
export class PostModule {}
