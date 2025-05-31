import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common' // Added UnauthorizedException
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

  async createPost(createPostDTO: CreatePostDTO, userId: MongooseSchema.Types.ObjectId): Promise<Post> {
    // 找到 draft 狀態的 StaticData ObjectId
    // const draftStatus = await this.staticDataModel.findOne({ type: 'postStatus', key: 'draft' }).exec()

    // if (!draftStatus) {
    //   throw new BadRequestException('Draft status not found in static data')
    // }

    const newPost = await this.postModel.create({
      ...createPostDTO,
      // status: draftStatus._id, // 設置默認狀態為 draft
      author: userId, // Set author to the userId from the token
    })
    return newPost.save()
  }

  async editPost(postId: MongooseSchema.Types.ObjectId, updatePostDTO: UpdatePostDTO, userId: MongooseSchema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findById(postId)
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    // Check if the user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      throw new UnauthorizedException('You are not authorized to edit this post')
    }
    const editedPost = await this.postModel.findByIdAndUpdate(postId, updatePostDTO, { new: true })
    return editedPost
  }

  async deletePost(postId: MongooseSchema.Types.ObjectId, userId: MongooseSchema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findById(postId)
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    // Check if the user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      throw new UnauthorizedException('You are not authorized to delete this post')
    }
    const deletedPost = this.postModel.findByIdAndDelete(postId)
    return deletedPost
  }
}
