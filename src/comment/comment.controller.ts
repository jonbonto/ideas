import { Controller, Param, Get, Post, Body, UseGuards, UsePipes, Delete } from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';
import { User } from '../user/user.decorator';

@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('idea/:id')
  showByIdea(@Param('id') ideaId: string) {
    return this.commentService.showByIdea(ideaId);
  }

  @Get('user/:id')
  showByUser(@Param('id') userId: string) {
    return this.commentService.showByUser(userId);
  }

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  create(@Param('id') ideaId: string, @User('id') userId: string, @Body() data: CommentDTO) {
    return this.commentService.create(ideaId, userId, data);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: string, @User('id') userId: string) {
    return this.commentService.destroy(id, userId);
  }

}
