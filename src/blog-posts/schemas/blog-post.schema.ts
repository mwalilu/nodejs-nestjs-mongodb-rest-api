import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class BlogPost extends Document {
  
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: [] })
  tags: string[];
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);