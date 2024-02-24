import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIssueDto } from './Dto/create-issue.dt';


@Injectable()
export class IssueService {
  constructor(private readonly prismaService: PrismaService) {}

  async createIssue(projectId: number, createIssueDto: CreateIssueDto) {
    try {
      // Check if the project exists
      const project = await this.prismaService.project.findFirst({
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
}
