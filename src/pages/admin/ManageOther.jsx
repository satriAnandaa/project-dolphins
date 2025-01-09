import React, { useState } from "react";
import { Card, Table, Button, Space, Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const ManageOther = () => {
  
  const [activeUsers, setActiveUsers] = useState([
    { key: 1, username: "john_doe", email: "john@example.com", role: "User" },
    { key: 2, username: "jane_doe", email: "jane@example.com", role: "Admin" },
  ]);

  
  const [userHistory, setUserHistory] = useState([
    { key: 1, username: "john_doe", action: "Logged in", date: "2025-01-05 10:20:30" },
    { key: 2, username: "jane_doe", action: "Changed password", date: "2025-01-06 12:15:45" },
  ]);

  
  const handleBanUser = (key) => {
    setActiveUsers(activeUsers.filter((user) => user.key !== key));
  };

  
  const activeUsersColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleBanUser(record.key)}>
          Ban User
        </Button>
      ),
    },
  ];


  const userHistoryColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Tabel Pengguna Aktif */}
          <Card title={<Title level={4}>Active Users</Title>} bordered>
            <Table
              dataSource={activeUsers}
              columns={activeUsersColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>

          {/* Tabel Riwayat Pengguna */}
          <Card title={<Title level={4}>User History</Title>} bordered>
            <Table
              dataSource={userHistory}
              columns={userHistoryColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default ManageOther;
