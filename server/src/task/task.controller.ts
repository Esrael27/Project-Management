import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './Dto/create-task.dto';
import { UpdateTaskProgressDtoType } from './Dto/update-task-progress.dto';
import { SetSetDeadlineDto } from './Dto/set-deadline.dto';

@Controller('api/projects/:projectId/tasks')

export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(
      @Param('projectId') projectId: string,  // Extract projectId from route parameter
      @Body() createTaskDto: CreateTaskDto  // Extract task creation data from request body
    ) {
      try {
        // Call task service to create a new task within the specified project
        const createdTask = await this.taskService.createTask(parseInt(projectId), createTaskDto); 
    
        // Return a JSON response with the created task data
        return {
          success: true,
          message: 'Task created successfully',
          data: createdTask,
        };
      } catch (error) {
        // Log any errors to the console
        console.error(error.message);
        // Throw a NotFoundException if creating the task fails
        throw new NotFoundException('Failed to create task');
      }
    }
    

   // Endpoint to update task progress
    @Put(':id/progress')
      async updateTaskProgress(
  @Param('id') taskId: string,  // Extract taskId from route parameter
  @Body() updateTaskProgressDto: UpdateTaskProgressDtoType,  // Extract task progress data from request body
) {
  try {
    // Call task service to update task progress with taskId and progress data
    return await this.taskService.updateTaskProgress(parseInt(taskId), updateTaskProgressDto.progress);
  } catch (error) {
    // Log any errors to the console
    console.error(error.message);
    // Throw a NotFoundException if updating the task progress fails
    throw new NotFoundException('Failed to update task progress');
  }
    }
// Endpoint to assign a task to a team member
     @Post(':taskId/assign/:teamMemberId')
     async assignTaskToTeamMember(
  @Param('taskId') taskId: string,  // Extract taskId from route parameter
  @Param('teamMemberId') teamMemberId: string,  // Extract teamMemberId from route parameter
) {
  try {
    // Call task service to assign the task to the team member
    await this.taskService.assignTaskToTeamMember(parseInt(taskId), parseInt(teamMemberId));
    
     // Emit a notification to the assigned team member
     const payload = {
      taskId: parseInt(taskId),
      message: 'You have been assigned a new task.',
    };
  
    // Return a success response
    return { success: true, message: 'Task assigned successfully' };
  } catch (error) {
    // Log any errors to the console
    console.error(error.message);
    // Throw a NotFoundException if assigning the task fails
    throw new NotFoundException('Failed to assign task');
  }
}

// Endpoint to set the deadline for a task
    @Put(':taskId/deadline')
    async setTaskDeadline(
  @Param('taskId') taskId: string,  // Extract taskId from route parameter
  @Body() setDeadlineDto: SetSetDeadlineDto,  // Extract deadline data from request body
) {
  try {
    // Call task service to set the deadline for the task
    await this.taskService.setTaskDeadline(parseInt(taskId), setDeadlineDto.deadline);
    
    // Return a success response
    return { 
      success: true, 
      message: 'Deadline set successfully'
    };
  } catch (error) {
    // Log any errors to the console
    console.error(error.message);
    // Throw a NotFoundException if setting the deadline fails
    throw new NotFoundException('Failed to set deadline for task');
  }
     }

// Decorator for GET endpoint
     @Get()
     async getAllTasks(@Param('projectId') projectId: string) {
         try {
             // Call service to get all tasks for the specified project
           const tasks = await this.taskService.getAllTasks(parseInt(projectId));
             
             // Return success response with tasks data
             return {
                 success: true,
                 data: tasks,
             };
         } catch (error) {
             console.error(error.message); // Log error
             throw new NotFoundException('Failed to fetch tasks'); // Throw 404 if failed to fetch tasks
         }
     }

 // Decorator for PUT endpoint with parameter
    @Put(':id')
    async updateTask(
        @Param('id') taskId: string, // Parameter decorator to get taskId from route
        @Body() updateTaskDto: any, // Request body for updating task
    ) {
        try {
            // Call service to update the task with provided data
            await this.taskService.updateTask(parseInt(taskId), updateTaskDto);
            
            // Return success response
            return {
                success: true,
                message: 'Task updated successfully',
            };
        } catch (error) {
            console.error(error.message); // Log error
            throw new NotFoundException('Task not found'); // Throw 404 if failed to update task
        }
    }

     // Decorator for GET endpoint with parameter
    @Get(':id') 
    async getTaskById(
        @Param('id') taskId: string, // Parameter decorator to get taskId from route
    ) {
        try {
            // Call service to get task by its ID
            const task = await this.taskService.getTaskById(parseInt(taskId));
            
            // Return success response with task data
            return {
                success: true,
                data: task,
            };
        } catch (error) {
            console.error(error.message); // Log error
            throw new NotFoundException('Task not found'); // Throw 404 if task not found
        }
    }
      // Decorator for DELETE endpoint with parameter
    @Delete(':id') 
    async deleteTask(
        @Param('id') taskId: string, // Parameter decorator to get taskId from route
    ) {
        try {
            // Call service to delete task by its ID
            await this.taskService.deleteTask(parseInt(taskId));
            
            // Return success response
            return {
                success: true,
                message: 'Task deleted successfully',
            };
        } catch (error) {
            console.error(error.message); // Log error
            throw new NotFoundException('Task not found'); // Throw 404 if failed to delete task
        }
    }
  
}
