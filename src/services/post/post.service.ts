import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'
import { CreatePostDTO, UpdatePostDTO } from 'src/resolvers/post/dto/post.dto'
import { Post, PostDocument } from 'src/entity/post.entity'
import { StaticData, StaticDataDocument } from 'src/entity/staticData.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(StaticData.name) private readonly staticDataModel: Model<StaticDataDocument>,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec()
    return posts
  }

  async getSinglePost(postId: MongooseSchema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findById(postId).exec()
    return post
  }

  async getPostsByTypeAndKey(type: string, categoryKey: string): Promise<Post[]> {
    const staticData = await this.staticDataModel.findOne({ type, categoryKey }).exec()

    if (!staticData) {
      throw new NotFoundException(`No ${type} found with key ${categoryKey}`)
    }

    let query: any
    switch (type) {
      case 'postCategory':
        query = { category: staticData._id }
        break
      case 'postStatus':
        query = { status: staticData._id }
      default:
        throw new BadRequestException(`Unsupported type: ${type}`)
    }

    return this.postModel.find(query).populate('category').populate('status').exec()
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await this.postModel.create(createPostDTO)
    return newPost.save()
  }

  async editPost(postId: MongooseSchema.Types.ObjectId, updatePostDTO: UpdatePostDTO): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(postId, updatePostDTO, { new: true })
    return editedPost
  }

  async deletePost(postId: MongooseSchema.Types.ObjectId): Promise<Post> {
    const deletedPost = this.postModel.findByIdAndDelete(postId)
    return deletedPost
  }
}
