import {Injectable } from '@nestjs/common';
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
  
}