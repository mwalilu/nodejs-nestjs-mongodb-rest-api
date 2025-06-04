import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './schemas/blog-post.schema';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  async create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost | null> {
    return this.blogPostsService.findById(id);
  }

  @Get('author/:authorId')
  async findByAuthor(
    @Param('authorId') authorId: string
  ): Promise<BlogPost[]> {
    return this.blogPostsService.findByAuthor(authorId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto
  ): Promise<BlogPost | null> {
    return this.blogPostsService.update(id, updateBlogPostDto);
  }

  @Put(':id/like')
  async likePost(@Param('id') id: string): Promise<BlogPost | null> {
    return this.blogPostsService.likePost(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogPostsService.delete(id);
  }
}