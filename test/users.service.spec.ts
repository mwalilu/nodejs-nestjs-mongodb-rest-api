import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    blogPosts: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn().mockResolvedValue([mockUser]),
            findById: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const result = await service.create(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('addBlogPost', () => {
    it('should add blog post to user', async () => {
      const userId = '1';
      const postId = 'post1';
      const updatedUser = { ...mockUser, blogPosts: [postId] };
      
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(updatedUser);
      
      const result = await service.addBlogPost(userId, postId);
      expect(result).toEqual(updatedUser);
      expect(result.blogPosts).toContain(postId);
    });
  });
});