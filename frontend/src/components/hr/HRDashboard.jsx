// frontend/src/components/hr/HRDashboard.jsx
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import EmployeeList from './EmployeeList';
import QueryInterface from '../common/QueryInterface';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total Employees', value: '150' },
    { title: 'Departments', value: '8' },
    { title: 'New Hires', value: '12' },
    { title: 'Open Positions', value: '5' }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="employees" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="query">Natural Language Query</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <Card className="p-6">
            <EmployeeList />
          </Card>
        </TabsContent>

        <TabsContent value="query">
          <Card className="p-6">
            <QueryInterface moduleContext="HR" />
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">HR Reports</h2>
            {/* Add reports content here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;