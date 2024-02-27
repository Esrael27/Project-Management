import { Injectable, ConflictException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMemberDto } from './Dto/Add-member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
    constructor(private readonly prismaService: PrismaService) {}

 
    async createMember(addMemberDto: AddMemberDto) {
        try {
            // Check if the username already exists
            const existingMember = await this.prismaService.teamMember.findUnique({
                where: {
                    username: addMemberDto.username,
                },
            });

            if (existingMember) {
                throw new ConflictException('Username already exists');
            }

            // Check if the email already exists
            const existingMemberEmail = await this.prismaService.teamMember.findUnique({
                where: {
                    email: addMemberDto.email,
                },
            });

            if (existingMemberEmail) {
                throw new ConflictException('Email already exists');
            }

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
            if (error instanceof ConflictException) {
                // Return a custom response with conflict status
                throw new ConflictException({ message: error.message, statusCode: HttpStatus.CONFLICT });
            } else {
                // Handle other errors
                console.error(error);
                throw error;
            }
        }
    }

    async getAllMembers() {
        try {
            // Retrieve all members from the database
            const members = await this.prismaService.teamMember.findMany();
            return members;
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    }

    
    async getMemberById(id: number) {
        try {
            // Retrieve the member by ID from the database
            const member = await this.prismaService.teamMember.findUnique({
                where: {
                    id: id,
                },
            });

            if (!member) {
                throw new NotFoundException();
              }
            return member;
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    }

    async updateMember(id: number, updateMemberDto: any) {
        try {
            // Retrieve the member by ID from the database
            const existingMember = await this.prismaService.teamMember.findUnique({
                where: {
                    id: id,
                },
            });

            if (!existingMember) {
                // If member not found, throw NotFoundException
                throw new NotFoundException('Member not found');
            }

            // Update the member's data
            const updatedMember = await this.prismaService.teamMember.update({
                where: {
                    id: id,
                },
                data: updateMemberDto,
            });

            return updatedMember;
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    }

    async deleteMember(id: number) {
        try {
            // Delete the member from the database
            const deletedMember = await this.prismaService.teamMember.delete({
                where: {
                    id: id,
                },
            });

            return deletedMember;
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    }

}
