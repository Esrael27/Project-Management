"use client"
import AddProjectForm from '@/ Components/AddProjectForm';
import React from 'react';


const AddProjectPage: React.FC = () => {
  const handleSubmit = (formData: any) => {
    
    // Send formData to backend API for processing
    console.log('Form Data:', formData);
    // You can make an API call here to send the data to the backend
  };

  return (
    <div>
      <h1>Add Project</h1>
      <AddProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProjectPage;
