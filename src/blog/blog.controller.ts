import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,} from '@nestjs/common'
import { Response } from 'express'
import { BlogService } from './blog.service'
import { CreatePostDTO } from './dto/create-post.dto'
import { ValidateObjectId } from './shared/pipes/validate-object-id'

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res: Response) {
    const posts = await this.blogService.getPosts()
    return res.status(HttpStatus.OK).json(posts)
  }

  @Get('post/:postId')
  async getPost(
    @Res() res: Response,
    @Param('postId', new ValidateObjectId()) postId: number,
  ) {
    const post = await this.blogService.getPost(postId)

    if (!post) {
      throw new NotFoundException('Post does not exist!')
    }

    return res.status(HttpStatus.OK).json(post)
  }

  @Post('/post')
  async addPost(@Res() res: Response, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO)
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been submitted successfully!', post: newPost })
  }

  @Put('/edit')
  async editPost(
    @Res() res: Response,
    @Query('postId', new ValidateObjectId()) postId: number,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postId, createPostDTO)

    if (!editedPost) {
      throw new NotFoundException('Post does not exist!')
    }

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been successfully updated', post: editedPost })
  }

  @Delete('/delete')
  async deletePost(
    @Res() res: Response,
    @Query('postId', new ValidateObjectId()) postId: number,
  ) {
    const deletedPost = await this.blogService.deletePost(postId)

    if (!deletedPost) {
      throw new NotFoundException('Post does not exist!')
    }

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Post has been deleted', post: deletedPost })
  }
}
