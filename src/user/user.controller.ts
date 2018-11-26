import { Controller, Post, Get, Body, UsePipes, UseGuards, Query } from '@nestjs/common';
import { ValidationPipe } from './../shared/validation.pipe';
import { AuthGuard } from './../shared/auth.guard';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.decorator';

@Controller()
export class UserController {

  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User() user, @Query('page') page: number) {
    console.log(user);
    return this.userService.showAll(page);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
