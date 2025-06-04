import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './create-blog-post.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}