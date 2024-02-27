// components/projects/TaskForm.tsx
"use client"
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createTask } from '@/service/tasksService';

const TaskForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await createTask(values);
      form.resetFields();
      // Optionally, you can add a success notification or redirect the user
    } catch (error) {
      console.error('Error creating Task:', error);
      // Handle error - display error message or notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter the Task title' }]}
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
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
