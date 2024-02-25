import { Body, ConflictException, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import { AddMemberDto } from './Dto/Add-member.dto';

@Controller('/api/members')
export class MemberController {
  prismaService: any;
    constructor(private readonly memberService: MemberService) {}

    @Post() // Decorator for POST endpoint
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

   // GET endpoint to fetch all members
    @Get() 
    async getAllMembers (
      @Param('id') id: string
    ){
      try {
        const members = await this.memberService.getAllMembers();
        return {
          success: true,
          data: members,
        };
      } catch (error) {
        console.error(error.message); // Log error
        throw new NotFoundException('Failed to fetch members'); // Throw 404 if failed to fetch members
      }
    }
   
    // GET endpoint to fetch a single member by ID
    @Get(':id') 
    async getMemberById (@Param('id') id: string){
      try {
        const members = await this.memberService.
        getMemberById(parseInt(id));
        return {
          success: true,
          data: members,
        };
      } catch (error) {
        console.error(error.message); // Log error
        throw new NotFoundException('members not found');
      }
    } 

  
  // Update member route handler
  @Put(':id')
  async updateMember(
    @Param('id') id: string, // Extract id parameter from the request URL
    @Body() memberData: any // Extract data from the request body
  ) {
    try {
      // Call the member service to update the member
      await this.memberService.updateMember(parseInt(id), memberData);

      // Return success message if member is updated successfully
      return {
        success: true,
        message: 'Member updated successfully',
      };
    } catch (error) {
      // Log error to the console
      console.error(error.message);
      
      // Throw NotFoundException if failed to update member
      throw new NotFoundException('Failed to update member');
    }
  }

       // DELETE endpoint to delete a member by ID  
   @Delete(':id') 
     async deleteMember (
       @Param('id') id: string
     ){
      try {
        await this.memberService.deleteMember(parseInt(id));
        return {
          success: true,
          message: 'Member deleted successfully',
        };
      } catch (error) {
        console.log(error.message);
          throw new NotFoundException('member not found');
      }
     }
    
}
