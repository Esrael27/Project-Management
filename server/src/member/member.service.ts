import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMemberDto } from './Dto/Add-member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
    constructor(private readonly prismaService: PrismaService) {}

    async createMember(addMemberDto: AddMemberDto) {
        try {
            // Hash the password before storing it
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(addMemberDto.password, saltRounds);

            // Create the new member in the database
            const newMember = await this.prismaService.teamMember.create({
                data: {
                    username: addMemberDto.username,
                    email: addMemberDto.email,
                    password: hashedPassword,
                    role: addMemberDto.role,
                },
            });

     
            return newMember;
        } catch (error) {
           console.log(error.message);
        }
    }
}
