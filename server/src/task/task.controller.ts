import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './Dto/create-task.dto';

@Controller('projects/:projectId/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(
    @Param('projectId') projectId: string,
    @Body() createTaskDto: CreateTaskDto) {
    try {
        const createdTask = await this.taskService.createTask(parseInt(projectId), createTaskDto); 

        // Return a JSON response with the created project data
      return {
        success: true,
        message: 'Project created successfully',
        data: createdTask,
      };
    } catch (error) {
        console.error(error.message);
      throw new NotFoundException('Failed to create task');
    }
    }
}
