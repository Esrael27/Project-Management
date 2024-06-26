import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberController } from './member.controller';

@Module({
  exports:[MemberService],
  providers: [MemberService,PrismaService],
  controllers: [MemberController]
})
export class MemberModule {}
