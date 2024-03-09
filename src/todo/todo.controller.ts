import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { TodoService } from './todo.service';
import { ResponseMessage } from './decorator/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(201)
  @ResponseMessage('성공적으로 할일이 추가 되었습니다!')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todoService.create(createTodoDto);
    return createdTodo;
  }

  @Get()
  @HttpCode(200)
  @ResponseMessage('성공적으로 모든 할일을 가져왔습니다!')
  async findAll() {
    const foundAllTodos = await this.todoService.findAll();

    if (foundAllTodos == null) {
      throw new HttpException('가져올 할 일이 없습니다.', HttpStatus.NOT_FOUND);
    }

    return foundAllTodos;
  }

  @Get(':id')
  @HttpCode(200)
  @ResponseMessage('성공적으로 할일을 가져왔습니다!')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todoService.findOne(id);

    if (foundTodo == null) {
      throw new HttpException(
        `${id}번 할 일이 없습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundTodo;
  }

  @Patch(':id')
  @HttpCode(201)
  @ResponseMessage('성공적으로 할일을 수정했습니다!')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const foundTodo = await this.todoService.findOne(id);

    if (foundTodo == null) {
      throw new HttpException(
        `${id}번 할 일이 없습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateTodo = await this.todoService.update(id, updateTodoDto);
    return updateTodo;
  }

  @Delete(':id')
  @HttpCode(200)
  @ResponseMessage('성공적으로 할일을 삭제했습니다!')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todoService.findOne(id);

    if (foundTodo == null) {
      throw new HttpException(
        `${id}번 할 일이 없습니다.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedTodo = await this.todoService.remove(id);

    return deletedTodo;
  }
}
