import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Typography, Tag, Avatar, Rate, Modal, Button, Drawer, Descriptions, Form, Input, DatePicker, Popconfirm, Select } from 'antd';
import './History.css';
import { getData } from "../../utils/api";

const { Title } = Typography;

const columnsOnProcess = [
  {
    title: 'Booking Date',
    dataIndex: 'booking_date',
    key: 'booking_date',
  },
  {
    title: 'Taking Seat',
    dataIndex: 'number_of_people',
    key: 'number_of_people',
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
    key: 'provider',
    render: (text, record) => (
      <div>
        <Avatar src={record.GuidanceAvatar} alt="Guidance" style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'booking_price',
    key: 'booking_price',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const columnsCompletedCancelled = [
  {
    title: 'Booking Date',
    dataIndex: 'booking_date',
    key: 'booking_date',
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
    key: 'provider',
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
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);

  useEffect(() => {
    getDataBookings();
  }, []);

  const getDataBookings = () => {
    setIsLoading(true);
    getData("/api/v1/bookings/read")
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          console.log(resp);
          setDataBooking(resp.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleSaveChanges = (values) => {
    const updatedData = dataBooking.map((item) =>
      item.key === selectedRecord.key ? { ...item, ...values } : item
    );
    setDataBooking(updatedData);
    setIsDrawerVisible(false);
  };

  const handleComplete = () => {
    const updatedData = dataBooking.map((item) =>
      item.key === selectedRecord.key ? { ...item, status: 'Completed' } : item
    );
    setDataBooking(updatedData);
    setIsDrawerVisible(false);
  };

  const handleCancel = () => {
    const updatedData = dataBooking.map((item) =>
      item.key === selectedRecord.key ? { ...item, status: 'Cancelled' } : item
    );
    setDataBooking(updatedData);
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

  const onProcessData = dataBooking.filter((item) => item.status === 'on process');
  const completedCancelledData = dataBooking.filter(
    (item) => item.status === 'complete' || item.status === 'cancelled'
  );

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
            loading={isLoading} 
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
        <div className="history-right">
          <h4>Completed & Cancelled</h4>
          <Table
            dataSource={completedCancelledData}
            columns={columnsCompletedCancelled}
            pagination={false}
            loading={isLoading} 
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
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff',
                  marginBottom: '20px',
                }}
              >
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
