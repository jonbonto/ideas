import { AuthGuard } from 'shared/auth.guard';
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger, UseGuards } from '@nestjs/common';

import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { User } from 'user/user.decorator';

@Controller('api/ideas')
export class IdeaController {
  
  private logger = new Logger('IdeaController');
  
  private logData(options) {
    options.id && this.logger.log('id: ' + JSON.stringify(options.id));
    options.userId && this.logger.log('user_id: ' + JSON.stringify(options.userId));
    options.data && this.logger.log('DATA: ' + JSON.stringify(options.data));
  }
  constructor(private ideaService: IdeaService) {

  }
  
  @Get()
  showAll() {
    return this.ideaService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  create(@User('id') userId, @Body() data: IdeaDTO) {
    this.logData({ userId, data });
    return this.ideaService.create(userId, data);
  }
  
  @Get(':id')
  show(@Param('id') id: string) {
    return this.ideaService.show(id);
  }
  
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  update(@Param('id') id: string, @User('id') userId, @Body() data: Partial<IdeaDTO> ) {
    this.logData({ id, userId, data });
    return this.ideaService.update(id, userId, data);
  }
  
  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroy(@Param('id') id: string, @User('id') userId){
    return this.ideaService.delete(id, userId);
  }
  @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvote(@Param('id') id: string, @User('id') userId: string) {
    this.logData({ id, userId });
    return this.ideaService.upvote(id, userId);
  }  
  @Post(':id/downvote')
  @UseGuards(new AuthGuard())
  downvote(@Param('id') id: string, @User('id') userId: string) {
    this.logData({ id, userId });
    return this.ideaService.downvote(id, userId);
  }
  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmark(@Param('id') id: string, @User('id') userId: string) {
    this.logData({ id, userId });
    return this.ideaService.bookmark(id, userId);
  }

  @Delete(':id/bookmark')
  @UseGuards(new AuthGuard())
  unbookmark(@Param('id') id: string, @User('id') userId: string) {
    this.logData({ id, userId });
    return this.ideaService.unbookmark(id, userId);
  }
}
