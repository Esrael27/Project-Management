"use client"
import React, { useState, useEffect } from 'react';
import { Spin, Card } from 'antd';
import { getProjectById } from '../../service/projectService';

interface GetProjectProps {
  projectId: string;
}

const GetProject: React.FC<GetProjectProps> = ({ projectId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <Spin />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Card title="Project Details">
      <p>ID: {project.id}</p>
      <p>Name: {project.name}</p>
    </Card>
  );
};

export default GetProject;
