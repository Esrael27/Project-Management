import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';

import { CreateIssueDto } from './Dto/create-issue.dt';
import { IssueService } from './issue.service';

@Controller('projects/:projectId/issues')
export class IssueController {
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
      throw new NotFoundException('Failed to create issue');
    }
  }
}
