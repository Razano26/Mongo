import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
