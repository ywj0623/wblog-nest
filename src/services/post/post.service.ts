import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'
import { CreatePostDTO, UpdatePostDTO } from 'src/resolvers/post/dto/post.dto'
import { Post, PostDocument } from 'src/entity/post.entity'

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec()
    return posts
  }

  async getSinglePost(postId: MongooseSchema.Types.ObjectId): Promise<Post> {
    const post = await this.postModel.findById(postId).exec()
    return post
  }

  async getPostsByCategory(categoryKey: string): Promise<Post[]> {
    const posts = await this.postModel
      .find()
      .populate({
        path: 'category',
        match: { type: 'category', key: categoryKey },
      })
      .exec()

    return posts.filter((post) => post.category)
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
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
