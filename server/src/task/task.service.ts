import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './Dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}

    async createTask(projectId: number,createTaskDto: CreateTaskDto) {
      try {
            // Check if the project exists
      const project = await this.prismaService.project.findUnique({
        where: { id: projectId },
      });
      
      if (!project) {
        throw new NotFoundException('Project not found');
      }

      // Create the task within the project
      return this.prismaService.task.create({
        data: {
          projectId,
          title: createTaskDto.title,
          description: createTaskDto.description,
          status: createTaskDto.status,
          priority: createTaskDto.priority,
        },
      });
      } catch (error) {
        
      }
    }
}
