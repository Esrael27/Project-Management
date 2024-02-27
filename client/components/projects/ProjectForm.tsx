// components/projects/ProjectForm.tsx
"use client"
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createProject } from '../../service/projectService';

const ProjectForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await createProject(values);
      form.resetFields();
      // Optionally, you can add a success notification or redirect the user
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error - display error message or notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="name"
        label="Project Name"
        rules={[{ required: true, message: 'Please enter the project name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter the project description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
