import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogPost } from './schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>,
    private usersService: UsersService
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const createdPost = new this.blogPostModel({
      ...createBlogPostDto,
      author: new Types.ObjectId(createBlogPostDto.author),
    });
    const savedPost = await createdPost.save();

    const postId = (savedPost._id as Types.ObjectId).toHexString();
    
    // Add post to user's blogPosts array
    await this.usersService.addBlogPost(
      createBlogPostDto.author,
      postId
    );
    
    return savedPost;
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostModel.find().populate('author', 'name email').exec();
  }

  async findById(id: string): Promise<BlogPost | null> {
    return this.blogPostModel.findById(id).populate('author').exec();
  }

  async findByAuthor(authorId: string): Promise<BlogPost[]> {
    return this.blogPostModel
      .find({ author: new Types.ObjectId(authorId) })
      .populate('author', 'name')
      .exec();
  }

  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto
  ): Promise<BlogPost | null> {
    return this.blogPostModel
      .findByIdAndUpdate(id, updateBlogPostDto, { new: true })
      .exec();
  }

  async likePost(id: string): Promise<BlogPost | null> {
    return this.blogPostModel
      .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<BlogPost | null> {
    return this.blogPostModel.findByIdAndDelete(id).exec();
  }
}