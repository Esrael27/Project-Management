import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import * as bcrypt from 'bcrypt';
import { AddMemberDto } from './Dto/Add-member.dto';

@Controller('/api')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}


  
    @Post('/members') // Decorator for POST endpoint
    async createProject(
      @Body(new ValidationPipe()) addMemberDto: AddMemberDto,
    ) {
      try {
        // Call the service to create a new project with the provided data
        const createdProject = await this.memberService.createMember(addMemberDto);
       
        // Return a JSON response with the created project data
        return {
          success: true,
          message: 'Members are created successfully',
          data: createdProject,
        };
      } catch (error) {
        // Log any errors that occur during the process
        console.error(error.message);
        // Return an appropriate error response to the client
        return {
          success: false,
          message: 'Internal server error',
          error: error.message,
        };
      }
    }
}
