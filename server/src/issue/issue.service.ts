import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIssueDto } from './Dto/create-issue.dt';


@Injectable()
export class IssueService {
  constructor(private readonly prismaService: PrismaService) {}

  
  async createIssue(projectId: number, createIssueDto: CreateIssueDto) {
    try {
      // Check if the project exists
      const project = await this.prismaService.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      // Create the issue within the project
      return this.prismaService.issue.create({
        data: {   
            projectId, 
            title: createIssueDto.title,
            description: createIssueDto.description,
            status: createIssueDto.status,
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to create issue');
    }
  }
  
  
  async getAllIssues(projectId: number) {
     try {
       const issues = await this.prismaService.issue.findMany({
         where: { projectId },
       });
       return issues;
     } catch (error) {
      
     }
    
  }
  
   // Update a task by its ID
   async updateIssue(
    projectId: number,
    updateTaskDto: any) {
    try {
        // Update the task with provided data
        const updatedIssue= await this.prismaService.issue.update({
            where: { id: projectId },
            data: updateTaskDto,
        });
        return updatedIssue;
    } catch (error) {
        console.error(error.message); // Log error
        throw new NotFoundException('Failed to update Issue'); // Throw 404 if failed to update task
    }
   }
   
  // Retrieve a task by its ID
  async getIssueById(id: number) {
    try {
        // Find a Issue by its ID
        const issue = await this.prismaService.issue.findUnique({
            where: { id: id },
        });

        if (!issue) {
          throw new NotFoundException('Task not found');
      }
        return issue;
    } catch (error) {
        console.error(error.message); // Log error
        throw new NotFoundException('Issue not found'); // Throw 404 if task not found
    }
   }

  async deleteIssue (id: number) {
    try {
       // Delete the member from the database
       const deletedissue = await this.prismaService.issue.delete({
        where: {
            id: id,
        },
    });

    return deletedissue;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to del issue');
    }
  }
}
