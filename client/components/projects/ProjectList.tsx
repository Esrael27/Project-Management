
"use client"
import { getAllProjects } from '@/service/projectService';
import React, { useEffect, useState } from 'react';
import { date } from 'zod';

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData: { data: Project[] } = await getAllProjects();
        setProjects(projectsData.data);
       
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project: Project) => (
          <li key={project.id}>
            <strong>{project.name}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

