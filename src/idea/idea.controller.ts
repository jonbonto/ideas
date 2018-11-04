import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('idea')
export class IdeaController {
  
  constructor(private ideaService: IdeaService) {

  }
  
  @Get()
  showAll() {
    return this.ideaService.showAll();
  }

  @Post()
  create(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.ideaService.show(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<IdeaDTO> ) {
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id') id: string){
    return this.ideaService.delete(id);
  }
}
