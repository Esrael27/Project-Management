import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AddProjectDto } from './Dto/Add-project.dto';

@Controller('/api')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/projects') // Decorator for POST endpoint
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
      // Return an appropriate error response to the client
      return {
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
