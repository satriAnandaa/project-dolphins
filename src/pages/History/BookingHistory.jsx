import React, { useState } from 'react';
import moment from 'moment'
import { Table, Typography, Tag, Avatar, Rate, Modal, Button, Drawer, Descriptions, Form, Input, DatePicker, Popconfirm, Select } from 'antd';
import './History.css';

const { Title } = Typography;

const dataSource = [
  {
    key: '1',
    Name: 'Wipa',
    NameAvatar: '/src/assets/wipa.JPG', 
    dateTime: '5 Oct 2024, 12:00 PM',
    Guidance: 'Mrs. Ketut Jaya',
    GuidanceAvatar: 'https://th.bing.com/th/id/OIP.8PKjm2sAL6gGb3aBqDE-qQHaFC?w=296&h=201&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    fees: 'Rp. 100.000',
    rating: 5,
    package: 'Watch Dolphin',
    status: 'Completed',
  },
  {
    key: '2',
    Name: 'Wipa',
    NameAvatar: '/src/assets/wipa.JPG',
    dateTime: '26 Sep 2024, 11:00 AM',
    Guidance: 'Mrs. Putu Surya',
    GuidanceAvatar: 'https://th.bing.com/th/id/OIP.3u_ZXcwL0Le0KLUAoB9z7gHaJQ?w=135&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    fees: 'Rp. 250.000',
    package: 'Watch and Snorkeling',
    rating: 0,
    status: 'Cancelled',
  },
  {
    key: '3',
    Name: 'Wipa',
    NameAvatar: '/src/assets/wipa.JPG',
    dateTime: '23 Sep 2024, 01:00 PM',
    Guidance: 'Mrs. Kadek Diva',
    GuidanceAvatar: 'https://th.bing.com/th/id/OIP.bDnVrq2GtuFu5KwJQhn6ygAAAA?w=246&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    fees: 'Rp. 300.000',
    package: 'Watch and Snorkeling',
    rating: 3,
    status: 'On Process',
  },
  {
    key: '4',
    Name: 'Wipa',
    NameAvatar: '/src/assets/wipa.JPG',
    dateTime: '25 Sep 2024, 02:00 PM',
    Guidance: 'Mrs. Komang Agus',
    GuidanceAvatar: 'https://th.bing.com/th/id/OIP.bAtqUXHSv0hWQVo5dwn6hQHaE8?w=306&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    fees: 'Rp. 120.000',
    package: 'Watch Dolphin',
    rating: 4,
    status: 'On Process',
  },
  {
    key: '5',
    Name: 'Wipa',
    NameAvatar: '/src/assets/wipa.JPG',
    dateTime: '23 Sep 2024, 11:00 AM',
    Guidance: 'Mrs. Wayan Putra',
    GuidanceAvatar: 'https://th.bing.com/th/id/OIP.I8hzLoQ3mouQOy4Hg7KNggHaHa?w=193&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    fees: 'Rp. 200.000',
    package: 'Watch Dolphin',
    rating: 0,
    status: 'On Process',
  },
];

const columnsOnProcess = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    render: (text, record) => (
      <div>
        <Avatar src={record.NameAvatar} alt="Name" style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Guidance',
    dataIndex: 'Guidance',
    key: 'Guidance',
    render: (text, record) => (
      <div>
        <Avatar src={record.GuidanceAvatar} alt="Guidance" style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const columnsCompletedCancelled = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    render: (text, record) => (
      <div>
        <Avatar src={record.NameAvatar} alt="Name" style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Guidance',
    dataIndex: 'Guidance',
    key: 'Guidance',
    render: (text, record) => (
      <div>
        <Avatar src={record.GuidanceAvatar} alt="Guidance" style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rating) => (
      <Rate disabled defaultValue={rating} style={{ color: '#FFD700' }} />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status, record) => (
      status === 'Completed' ? (
        <Tag color="green" style={{ cursor: 'pointer' }} onClick={() => record.onViewDetails(record)}>
          Completed
        </Tag>
      ) : (
        <Tag color="red">Cancelled</Tag>
      )
    ),
  },
];

const BookingHistory = () => {
 const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(dataSource);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [formValues, setFormValues] = useState({
    Name: '',
    dateTime: '',
    Guidance: '',
    status: '',
  });

  const handleSaveChanges = (values) => {
    const updatedData = data.map((item) =>
      item.key === selectedRecord.key ? { ...item, ...values } : item
    );
    setData(updatedData); 
    setIsDrawerVisible(false);
  };


  const handleComplete = () => {
    const updatedData = data.map(item =>
      item.key === selectedRecord.key
        ? { ...item, status: 'Completed' }
        : item
    );
    setData(updatedData); 
    setIsDrawerVisible(false); 
  };

  const handleCancel = () => {
    const updatedData = data.map(item =>
      item.key === selectedRecord.key
        ? { ...item, status: 'Cancelled' }
        : item
    );
    setData(updatedData); 
    setIsDrawerVisible(false);
  };


  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setIsDrawerVisible(true); 
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const updatedDataSource = data.map(item => ({
    ...item,
    onViewDetails: handleViewDetails,
  }));



  const onProcessData = data.filter(item => item.status === 'On Process');
  const completedCancelledData = data.filter(item =>
    item.status === 'Completed' || item.status === 'Cancelled'
  );

  const fullData = [
    // ...updatedDataSource,
    ...completedCancelledData
  ]

  const updatedDataSources = completedCancelledData.map(item => ({
    ...item,
    onViewDetails: handleViewDetails,
  }));


  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'left', marginBottom: '20px' }}>
        Booking History
      </Title>
      <div className="history-container">
        <div className="history-left">
          <h4>On Process</h4>
          <Table
            dataSource={onProcessData}
            columns={columnsOnProcess}
            pagination={false}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
        <div className="history-right">
          <h4>Completed & Cancelled</h4>
          <Table
            dataSource={updatedDataSources}
            columns={columnsCompletedCancelled}
            pagination={false}
            
          />
        </div>
      </div>

      <Drawer
        title="Edit Booking"
        open={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        width={400}
      >
        {selectedRecord && (
          <>
            <Form
              layout="vertical"
              initialValues={{
                Name: selectedRecord.Name,
                dateTime: moment(selectedRecord.dateTime, 'D MMM YYYY, hh:mm A'),
                Guidance: selectedRecord.Guidance,
                status: selectedRecord.status,
              }}
              onFinish={handleSaveChanges}
            >
              <Form.Item label="Name" name="Name">
                <Input />
              </Form.Item>
              <Form.Item label="Date & Time" name="dateTime">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Guidance" name="Guidance">
                <Input />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Select>
                  <Select.Option value="On Process">On Process</Select.Option>
                  <Select.Option value="Completed">Completed</Select.Option>
                  <Select.Option value="Cancelled">Cancelled</Select.Option>
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff', marginBottom: '20px' }}>
                Save
              </Button>
            </Form>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="default"
                onClick={handleComplete}
                style={{
                  width: '48%',
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                  color: '#fff',
                }}
              >
                Done
              </Button>
              <Popconfirm
                title="Are you sure to cancel?"
                onConfirm={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                  style={{
                    width: '48%',
                    backgroundColor: '#f5222d',
                    borderColor: '#f5222d',
                    color: '#fff',
                  }}
                >
                  Cancel
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </Drawer>



      <Modal
        title="Booking Details"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedRecord.Name}</Descriptions.Item>
            <Descriptions.Item label="Date & Time">{selectedRecord.dateTime}</Descriptions.Item>
            <Descriptions.Item label="Guidance">{selectedRecord.Guidance}</Descriptions.Item>
            <Descriptions.Item label="Fees">{selectedRecord.fees}</Descriptions.Item>
            <Descriptions.Item label="Package">{selectedRecord.package}</Descriptions.Item>
            <Descriptions.Item label="Rating">
              <Rate disabled defaultValue={selectedRecord.rating} style={{ color: '#FFD700' }} />
            </Descriptions.Item>
            <Descriptions.Item label="Status">{selectedRecord.status}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

    </div>
  );
};

export default BookingHistory;