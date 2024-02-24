import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

interface AddProjectFormProps {
  onSubmit: (formData: any) => void; // Adjust the type according to your needs
}

const statusOptions = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED'];

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make POST request to backend API
      await axios.post('http://localhost:3001/api/projects', formData);
      // Call onSubmit callback if needed
      onSubmit(formData);
      // Reset form fields after submission if needed
      setFormData({
        name: '',
        description: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="projectName" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="">Select Status</option>
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      {/* Add more fields and validations as needed */}
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
