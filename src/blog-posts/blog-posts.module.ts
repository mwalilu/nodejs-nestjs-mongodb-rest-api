import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: BlogPost.name, 
      schema: BlogPostSchema 
    }]),
    UsersModule, // Import UsersModule to access UsersService
  ],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
  exports: [BlogPostsService], // Export if needed by other modules
})
export class BlogPostsModule {}