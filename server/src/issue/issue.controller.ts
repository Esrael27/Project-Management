import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';

import { CreateIssueDto } from './Dto/create-issue.dt';
import { IssueService } from './issue.service';

@Controller('api/projects/:projectId/issues')
export class IssueController {
  taskService: any;
  projectService: any;
    constructor(private readonly issueService: IssueService) {}

  @Post()
  async createIssue(
    @Param('projectId') projectId: string,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    try {
      const createIssue = await this.issueService.createIssue
      (parseInt(projectId), createIssueDto);
     
      return {
        success: true,
        message: 'Issue created successfully',
        data: createIssue,
      }
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to create issue within project');
    }
  }

  @Get() 
  async getAllIssues(@Param('projectId') projectId: string) {
    try {
      const issues = await this.issueService.getAllIssues(parseInt(projectId));
      return {
        success: true,
        
        data: issues,
      };
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to fetch issues');
    }
  }

  @Get(':id') 
  async getIssueById(
          @Param('id') id: string, // Parameter decorator to get taskId from route
      ) {
          try {
              // Call service to get task by its ID
              const issue = await this.issueService.getIssueById(parseInt(id));
              
              // Return success response with task data
              return {
                  success: true,
                  data: issue,
              };
          } catch (error) {
              console.error(error.message); // Log error
              throw new NotFoundException('Issue not found'); // Throw 404 if task not found
          }
      }
  @Put(':id') // Decorator for PUT endpoint with parameter
   async updateIssue(
        @Param('id') projectId: string, // Define parameter for project ID
        @Body() updateIssueDto: any, // Define DTO for updating project
           ) 
      {
      try {
        await this.issueService.updateIssue(parseInt(projectId), updateIssueDto); // Call service to update project
        return {
          success: true,
          message: 'Issue updated successfully',
        }; // Return success response
      } catch (error) {
        console.error(error.message); // Log error
        throw new NotFoundException('Issue not found'); // Throw 404 if failed to update project
      }
  }

  @Delete(':id')
  async deleteIssue(
    @Param('id')id: string) {
    try {
      await this.issueService.deleteIssue(parseInt(id)); // Call service to delete project
      return {
        success: true,
        message: 'Issue deleted successfully',
      }; // Return success response
    } catch (error) {
      console.error(error.message); // Log error
      throw new NotFoundException('Failed to delete Issue'); // Throw 404 if failed to delete project
    }
  }



}
