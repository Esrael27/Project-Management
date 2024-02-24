import { Module } from '@nestjs/common';
import { MemberModule } from 'src/member/member.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    MemberModule,
    ProjectModule,
    TaskModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
