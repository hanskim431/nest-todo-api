import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.isDone,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.isDone,
      },
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}
