import { IsString, IsNotEmpty, IsMongoId, IsArray, IsOptional, MaxLength } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;

  @IsMongoId()
  author: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}