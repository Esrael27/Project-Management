import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TaskService,PrismaService],
  controllers: [TaskController]
})
export class TaskModule {}
