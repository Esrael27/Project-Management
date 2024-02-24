import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';

import { IssueController } from './issue.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [IssueService,PrismaService],
    controllers: [IssueController]
})
export class IssueModule {}
