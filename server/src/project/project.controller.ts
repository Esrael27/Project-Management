import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AddProjectDto } from './Dto/Add-project.dto';
import { UpdateProjectProgressDtoType } from './Dto/update-project-progress.dto';
import { SetSetDeadlineDto } from './Dto/set-deadline.dto';
@Controller('/api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post() // Decorator for POST endpoint
  async createProject(
    @Body(new ValidationPipe()) addProjectDto: AddProjectDto,
  ) {
    try {
      // Call the service to create a new project with the provided data
      const createdProject = await this.projectService.createProject(addProjectDto);
     
      // Return a JSON response with the created project data
      return {
        success: true,
        message: 'Project created successfully',
        data: createdProject,
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

  @Put(':id/progress')
  async updateTaskProgress(
    @Param('id') taskId: string,
    @Body() updateProjectProgressDto: UpdateProjectProgressDtoType,
  ) {
    try {
      return await this.projectService.updateProjectProgress(parseInt(taskId), updateProjectProgressDto.progress);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to update project progress');
    }
  }

  @Put(':projectId/deadline')
  async setTaskDeadline(
    @Param('projectId') projectId: string,
    @Body() setDeadlineDto: SetSetDeadlineDto,
  ) {
    try {
      await this.projectService.setProjectDeadline(parseInt(projectId), setDeadlineDto.deadline);
      return {
         success: true,
         message:'Deadline set successfully'
         };
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to set deadline for project');
    }
  }
  
  @Get() // Decorator for GET endpoint
  async getAllProjects() {
    try {
      const projects = await this.projectService.getAllProjects(); // Call service to get all projects
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
      const project = await this.projectService.getProjectById(parseInt(projectId)); // Call service to get project by ID
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
