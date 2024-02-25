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

    async updateTaskProgress(taskId: number, progress: number) {
      try {
        const task = await this.prismaService.task.update({
          where: { id: taskId },
          data: { progress },
        });
        return task;
      } catch (error) {
        console.error(error.message);
        throw new NotFoundException('Failed to update task progress');
      }
    }

   async assignTaskToTeamMember(taskId: number, teamMemberId: number): Promise<boolean> {
  try {
    // Check if the task exists
    const task = await this.prismaService.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Check if the team member exists
    const teamMember = await this.prismaService.teamMember.findUnique({ where: { id: teamMemberId } });
    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    // Update the assignedToId field of the task in the database
    await this.prismaService.task.update({
      where: { id: taskId },
      data: { assignedToId: teamMemberId },
    });

    return true; // Task assignment successful
  } catch (error) {
    console.error(error.message);
    throw new NotFoundException('Failed to assign task');
  }
}


    async setTaskDeadline(taskId: number, deadline: Date) {
      try {
        // Update the deadline field of the task in the database
        await this.prismaService.task.update({
          where: { id: taskId },
          data: { deadline },
        });
      } catch (error) {
        console.error(error.message);
        throw new NotFoundException('Failed to set deadline for task');
      }
    }

      // Retrieve all tasks assigned to a project
      async getAllTasks(projectId: number) {
        try {
            // Find all tasks belonging to the specified project
            const tasks = await this.prismaService.task.findMany({
                where: { projectId },
            });
            return tasks;
        } catch (error) {
            console.error(error.message); // Log error
            throw new NotFoundException('Failed to fetch tasks'); // Throw 404 if failed to fetch tasks
        }
       }
  
     // Update a task by its ID
     async updateTask(taskId: number, updateTaskDto: any) {
      try {
          // Update the task with provided data
          const updatedTask = await this.prismaService.task.update({
              where: { id: taskId },
              data: updateTaskDto,
          });
          return updatedTask;
      } catch (error) {
          console.error(error.message); // Log error
          throw new NotFoundException('Failed to update task'); // Throw 404 if failed to update task
      }
     }
   

     
  // Retrieve a task by its ID
     async getTaskById(taskId: number) {
      try {
          // Find a task by its ID
          const task = await this.prismaService.task.findUnique({
              where: { id: taskId },
          });
  
          if (!task) {
            throw new NotFoundException();
          }
          return task;
      } catch (error) {
          console.error(error.message); // Log error
          throw new NotFoundException('Task not found'); // Throw 404 if task not found
      }
     }

  // Delete a task by its ID
      async deleteTask(taskId: number) {
       // Find a task by its ID
       const task = await this.prismaService.task.findUnique({
        where: { id: taskId },
    });
    if (!task) {
        throw new NotFoundException('Task not found');
    }
      try {
          // Delete the task from the database
          await this.prismaService.task.delete({
              where: { id: taskId },
          });
      } catch (error) {
          console.error(error.message); // Log error
          throw new NotFoundException('Task not found'); // Throw 404 if failed to delete task
      }
     }
}
