import { Module } from '@nestjs/common';
import { IssueModule } from 'src/issue/issue.module';
import { MemberModule } from 'src/member/member.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    MemberModule,
    ProjectModule,
    TaskModule,
    IssueModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
