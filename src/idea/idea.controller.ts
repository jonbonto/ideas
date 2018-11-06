import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common';

import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('idea')
export class IdeaController {
  
  private logger = new Logger('IdeaController');

  constructor(private ideaService: IdeaService) {

  }
  
  @Get()
  showAll() {
    return this.ideaService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.ideaService.show(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<IdeaDTO> ) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id') id: string){
    return this.ideaService.delete(id);
  }
}
