import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog-api'),
    UsersModule,
    BlogPostsModule,
  ],
})
export class AppModule {}