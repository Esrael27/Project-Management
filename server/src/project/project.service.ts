import {Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProjectDto } from './Dto/Add-project.dto';


@Injectable()
export class ProjectService{
  constructor(private readonly prismaservice: PrismaService) {}
  

  async createProject(AddProjectDto: AddProjectDto) {
    try {
      
      return this.prismaservice.project.create({
        data: {
               name:AddProjectDto.name,
               description: AddProjectDto.description,
               status: AddProjectDto.status,       
            },
      })
    } catch (error) {
      
    }
  }
  
  async updateProjectProgress(projectId: number, progress: number) {
    try {
      const task = await this.prismaservice.project.update({
        where: { id: projectId },
        data: { progress},
      });
      return task;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to update project progress');
    }
  }

  async setProjectDeadline(projectId: number, deadline: Date) {
    try {
      // Update the deadline field of the project in the database
      await this.prismaservice.project.update({
        where: { id: projectId }, // Provide the project ID here
        data: { deadline}, // Use the provided deadline parameter
      });
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to set deadline for project');
    }
  }
  

  async getAllProjects() {
    try {
      // Retrieve all projects from the database
      return await this.prismaservice.project.findMany();
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException();
    }
  }

  async getProjectById(projectId: number) {
    try {
      // Find a project by its ID in the database
      const project = await this.prismaservice.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        throw new NotFoundException();
      }
      return project;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Failed to fetch project');
    }
  }

  async updateProject(projectId: number, updateProjectDto: any) {
    try {
      // Update a project with the provided data
      const updatedProject =  await this.prismaservice.project.update({
        where: { id: projectId },
        data: updateProjectDto,
      });
      return updatedProject;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException();
    }
  }

  async deleteProject(projectId: number) {
    try {
      // Delete a project by its ID
      await this.prismaservice.project.delete({
        where: { id: projectId },
      });
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException();
    }
  }
}