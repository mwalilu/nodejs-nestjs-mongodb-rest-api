import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogPostsService } from '../blog-posts.service';
import { BlogPost } from '../schemas/blog-post.schema';
import { UsersService } from '../../users/users.service';

describe('BlogPostsService', () => {
  let service: BlogPostsService;
  let model: Model<BlogPost>;
  let usersService: UsersService;

  const mockAuthorId = new Types.ObjectId();
  const mockPost = {
    _id: '1',
    title: 'Test Post',
    content: 'Test content',
    author: mockAuthorId,
    likes: 0,
    tags: ['test'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostsService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockPost),
            find: jest.fn().mockResolvedValue([mockPost]),
            findById: jest.fn().mockResolvedValue(mockPost),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockPost),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockPost),
            find: jest.fn().mockResolvedValue([mockPost]),
          },
        },
        {
          provide: UsersService,
          useValue: {
            addBlogPost: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
    model = module.get<Model<BlogPost>>(getModelToken(BlogPost.name));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog post and add to user', async () => {
      const createDto = {
        title: 'Test Post',
        content: 'Test content',
        author: mockAuthorId.toString(),
      };

      const result = await service.create(createDto);
      expect(result).toEqual(mockPost);
      expect(usersService.addBlogPost).toHaveBeenCalledWith(
        mockAuthorId.toString(),
        mockPost._id
      );
    });
  });

  describe('likePost', () => {
    it('should increment likes count', async () => {
      const updatedPost = { ...mockPost, likes: mockPost.likes + 1 };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(updatedPost);
      
      const result = await service.likePost('1');
      expect(result.likes).toBe(1);
    });
  });
});