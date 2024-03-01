"use client"; // Import the client module

import { Layout, Menu, Breadcrumb, notification, Button, Dropdown, Avatar } from 'antd'; // Import necessary components from Ant Design
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'; // Import necessary icons
import { useEffect, useState } from 'react'; // Import necessary hooks from React
import { redirect } from 'next/navigation'; // Import navigation function from Next.js

const { Header, Content, Footer } = Layout; // Destructure components from Layout

// Define roles and their corresponding allowed features
const roleFeaturesMap: Record<string, string[]> = {
  admin: ['Projects', 'Tasks', 'Team', 'Issues', 'Schedule'], // Features allowed for admin role
  user: ['Tasks', 'Issues'], // Features allowed for user role
};

// Define DashboardPage component
const DashboardPage: React.FC<{ role: string }> = ({ role }) => {
  // State to manage notification count
  const [notificationCount, setNotificationCount] = useState(0); // Initialize notification count state

  // Example notification
  useEffect(() => {
    // Simulate new notifications
    setNotificationCount(3); // Set notification count to 3
  }, []);

  // Handle menu item click
  const handleMenuClick = (route: string) => {
    redirect(route); // Redirect to specified route
  };

  // Handle user menu item click
  const handleUserMenuClick = ({ key }: { key: React.Key }) => {
    if (key === 'logout') {
      // Implement logout functionality
      console.log('Logged out'); // Log "Logged out" to console
    } else {
      // Handle other user menu options
      console.log(`Clicked ${key}`); // Log clicked menu item to console
    }
  };

  // Generate dropdown menu items based on user's role
  const userMenuItems = roleFeaturesMap[role].map((feature, index) => (
    <Menu.Item key={feature.toLowerCase()}>{feature}</Menu.Item> // Map features to menu items
  ));

  // Add logout option to the menu
  userMenuItems.push(<Menu.Divider key="divider" />); // Add divider
  userMenuItems.push(
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item> // Add logout menu item
  );

  const userMenu = <Menu onClick={handleUserMenuClick}>{userMenuItems}</Menu>; // Define user menu

  // Return the dashboard layout
  return (
    <Layout className="min-h-screen">
      <Header className="bg-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-white text-2xl">Logo</div> {/* Logo */}
          <Menu theme="dark" mode="horizontal" onClick={({ key }) => handleMenuClick(key as string)}>
            <Menu.Item key="/dashboard">Dashboard</Menu.Item> {/* Dashboard menu item */}
            {roleFeaturesMap[role].map((feature, index) => (
              <Menu.Item key={`/${feature.toLowerCase()}`}>{feature}</Menu.Item> // Map features to menu items
            ))}
          </Menu>
          <div className="flex items-center">
            <Button type="text" className="text-white mr-4">
              <BellOutlined className="text-lg" />
              <span className="ml-1">{notificationCount}</span> {/* Notification count */}
            </Button>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button type="text" className="text-white">
                <Avatar icon={<UserOutlined />} />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content className="container mx-auto py-8">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item> {/* Breadcrumb */}
        </Breadcrumb>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleFeaturesMap[role].map((feature, index) => (
            <DashboardFeatureCard key={index} title={feature} description={`Manage ${feature.toLowerCase()}`} /> // Render feature cards
          ))}
        </div>
      </Content>
      <Footer className="text-center bg-gray-200 py-4">Your Footer</Footer> {/* Footer */}
    </Layout>
  );
};

// Define DashboardFeatureCard component
const DashboardFeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2> {/* Feature title */}
    <p className="text-gray-700">{description}</p> {/* Feature description */}
  </div>
);

// Render the DashboardPage component with the role set to "admin"
const MyAdminDashboard: React.FC = () => <DashboardPage role="admin" />;
const MyUserDashboard: React.FC = () => <DashboardPage role="user" />;
export default MyUserDashboard; // Export default User Dashboard component
