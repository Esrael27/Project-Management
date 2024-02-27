import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AddProjectDto } from './Dto/Add-project.dto';
import { UpdateProjectProgressDtoType } from './Dto/update-project-progress.dto';
import { SetSetDeadlineDto } from './Dto/set-deadline.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('/api/projects')
 
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(RolesGuard) // Decorator for POST endpoint
  async createProject(
    @Body(new ValidationPipe()) addProjectDto: AddProjectDto,
  ) {
    try {
      // Call the service to create a new project with the provided data
      await this.projectService.createProject(addProjectDto);
     
      // Return a JSON response with the created project data
      return {
        success: true,
        message: 'Project created successfully',
       
      };
    } catch (error) {
      // Log any errors that occur during the process
      console.error(error.message);

      throw new NotFoundException('Failed to create project');
      // Return an appropriate error response to the client
      return {
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  // Endpoint for updating task progress, accepts taskId in the route parameter
  @Put(':id/progress')
  async updateTaskProgress(
     // Extracts taskId from route parameter
    @Param('id') taskId: string, 
    // Extracts project progress data from request body
    @Body() updateProjectProgressDto: UpdateProjectProgressDtoType,  
  ) {
    try {
         // Calls project service to update project progress with taskId and progress data
      return await this.projectService.updateProjectProgress(parseInt(taskId), updateProjectProgressDto.progress); 
    
    } catch (error) {
       // Log any errors to the console
      console.error(error.message); 

      // Throws a NotFoundException with a descriptive message if an error occurs
      throw new NotFoundException('Failed to update project progress');  
    }
  }
  

// Endpoint to set the deadline for a project
@Put(':projectId/deadline')
async setTaskDeadline(
  // Extract projectId from the route parameter
  @Param('projectId') projectId: string,
  // Extract deadline data from the request body
  @Body() setDeadlineDto: SetSetDeadlineDto,
) {
  try {
    // Call the project service to set the project deadline
    await this.projectService.setProjectDeadline(parseInt(projectId), setDeadlineDto.deadline);
    
    // Return a success response
     return {
      success: true,
      message: 'Deadline set successfully'
       };
  } catch (error) {
    // Log any errors and throw an exception if setting the deadline fails
    console.error(error.message);
    throw new NotFoundException('Failed to set the deadline for the project');
  }
}

  
  
  @Get() // Decorator for GET endpoint
  async getAllProjects() {
    try {
      // Call service to get all projects
      const projects = await this.projectService.getAllProjects(); 
      return {
        success: true,
        data: projects,
      }; // Return success response with projects data
    } catch (error) {
      console.error(error.message); // Log error
      throw new NotFoundException('Failed to fetch projects'); // Throw 404 if failed to fetch projects
    }
  }

  @Get(':id') // Decorator for GET endpoint with parameter
  async getProjectById(@Param('id') projectId: string) {
    try {
      // Call service to get project by ID
      const project = await this.projectService.getProjectById(parseInt(projectId)); 
      return {
        success: true,
        data: project,
      }; // Return success response with project data
    } catch (error) {
      console.error(error.message); // Log error
      throw new NotFoundException('Project not found'); // Throw 404 if project not found
    }
  }

  @Put(':id') // Decorator for PUT endpoint with parameter
  async updateProject(
    @Param('id') projectId: string, // Define parameter for project ID
    @Body() updateProjectDto: any, // Define DTO for updating project
  ) {
    try {
      await this.projectService.updateProject(parseInt(projectId), updateProjectDto); // Call service to update project
      return {
        success: true,
        message: 'Project updated successfully',
      }; // Return success response
    } catch (error) {
      console.error(error.message); // Log error
      throw new NotFoundException('project not found'); // Throw 404 if failed to update project
    }
  }

  @Delete(':id') // Decorator for DELETE endpoint with parameter
  async deleteProject(
    @Param('id') projectId: string) {
    try {
      await this.projectService.deleteProject(parseInt(projectId)); // Call service to delete project
      return {
        success: true,
        message: 'Project deleted successfully',
      }; // Return success response
    } catch (error) {
      console.error(error.message); // Log error
      throw new NotFoundException('Failed to delete project'); // Throw 404 if failed to delete project
    }
  }
}
