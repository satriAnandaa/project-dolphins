import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Typography, Tag, Avatar, Rate, Modal, Button, Drawer, Descriptions, Form, Input, DatePicker, Popconfirm, Select, notification, Space } from 'antd';
import './History.css';
import { editDataPrivatePut, getData, getDataPrivate } from "../../utils/api";
import { Trash2 } from 'lucide-react';

const { Title } = Typography;

const BookingHistory = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBooking, setDataBooking] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form] = Form.useForm();

  const handleEditBooking = (record) => {
    console.log("Editing booking record:", record);
    setEditingBooking(record);
    setSelectedRecord(record);
    form.setFieldsValue({
      status: record.status,
    });
    setIsDrawerVisible(true);
  };

  const handleDelete = (record) => {
    if (!record.booking_Id) {
      openNotification("error", "Delete Failed", "Booking ID is missing.");
      return;
    }
  
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/bookings/delete/${record.booking_Id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          openNotification("success", "Booking Deleted", "The booking has been successfully deleted.");
          getDataBookings(); // Refresh the booking data
        } catch (error) {
          console.error("Error deleting booking:", error);
          openNotification("error", "Delete Failed", "There was an error while deleting the booking. Please try again.");
        }
      },
    });
  };
  
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={(e) => {
          e.stopPropagation();
          handleEditBooking(record);
        }}>
          Edit
        </Button>
      ),
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        status === 'completed' ? (
          <Tag color="green" style={{ cursor: 'pointer' }} onClick={() => record.onViewDetails(record)}>
            Completed
          </Tag>
        ) : (
          <Tag color="red">Cancelled</Tag>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Trash2 className="h-5 w-5" />}
            onClick={() => handleDelete(record)}
            className="text-red-600 hover:bg-red-50"
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDataBookings();
  }, []);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

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

  const handleUpdateBooking = () => {
    const payload = form.getFieldsValue();
    const status = payload.status;

    editDataPrivatePut(`/api/v1/bookings/update/${editingBooking.booking_Id}`, payload)
      .then((response) => {
        console.debug("API response received:", response);

        // Update the dataBooking to reflect the new status
        setDataBooking((prevData) =>
          prevData.map((item) =>
            item.booking_Id === editingBooking.booking_Id
              ? { ...item, status } // Update the status
              : item
          )
        );

        // Optionally open a notification for success
        openNotification('success', 'Success', 'Booking updated successfully');
        form.resetFields();
        setEditingBooking(null);
        setIsDrawerVisible(false);
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        openNotification('error', 'Error', 'Failed to update booking');
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
      item.key === selectedRecord.key ? { ...item, status: 'Completed', } : item
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
    (item) => item.status === 'completed' || item.status === 'cancelled'
  );

  let dataBookingCompleted = dataBooking.filter((item) => {
    const status = item?.status?.toLowerCase();
    return status.includes("completed") || status.includes("cancelled");
  });
  

  return (
    <div style={{ padding: '20px' }}>
      {/* {console.log(dataBookingCompleted)} */}
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
              onClick: () => handleEditBooking(record),
            })}
          />
        </div>
        <div className="history-right">
          <h4>Completed & Cancelled</h4>
          <Table
            dataSource={dataBookingCompleted}
            columns={columnsCompletedCancelled}
            pagination={false}
            loading={isLoading}
          />
        </div>
      </div>

      <Drawer
        title="Edit Booking"
        open={isDrawerVisible}
        onClose={() => {
          setIsDrawerVisible(false);
          form.resetFields();
          setEditingBooking(null);
        }}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateBooking}
        >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="on process">On Process</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              htmlType="submit"
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
        </Form>
      </Drawer>

      <Modal
        title="Booking Details"
        open={modalVisible}
        onCancel={closeModal}
        footer={[<Button key="close" onClick={closeModal}>Close</Button>]}
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