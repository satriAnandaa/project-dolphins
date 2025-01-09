import React, { useState, useEffect, useContext } from 'react';
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Table, Space, Button, Image, Input, Modal, Form, InputNumber, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getData, getDataPrivate } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { getUserImage } from '../../utils/static';

const TourPackage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useContext(AuthContext);
  

  useEffect(() => {
    getDataPackage();
  }, []);

  const getDataPackage = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/dolphin_packages/read/" + userProfile.user_id)
      .then((resp) => {
        setIsLoading(false);
        if (resp?.data) {
          setDataSource(resp?.data.map((item) => ({
            ...item,
            is_favorite: item.is_favorite === 1,
            key: item.id,
          })));
        } else {
          console.log("Cannot fetch data");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching packages:", err);
      });
  };

  const handlePackage = (values) => {
    if (!imageUrl) {
      openNotification("error", "Validation Failed", "Please upload a package image.");
      return;
    }

    const formData = new FormData();
    formData.append("package_name", values.package_name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("seat_available", values.seat_available);
    formData.append("rating", values.rating);
    formData.append("provider", values.provider);
    formData.append("user_id", userProfile.user_id);
    formData.append("package_image", imageFile);

    fetch("http://localhost:5000/api/v1/dolphin_packages/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create package");
        }
      })
      .then((data) => {
        openNotification("success", "Package Created!", `Your package "${values.package_name}" has been successfully created.`);
        resetForm();
        getDataPackage();
      })
      .catch((error) => {
        openNotification("error", "Creation Failed", "There was an error while processing your request. Please try again.");
      });
  };

  const openNotification = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  const handleEdit = (record) => {
    console.log("Editing record:", record);
    setEditingPackage(record);
    form.setFieldsValue({
      package_name: record.package_name,
      description: record.description,
      price: record.price,
      seat_available: record.seat_available,
      rating: record.rating,
      provider: record.provider,
    });
    setImageUrl(record.package_image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleUpdatePackage = (values) => {
    if (!imageFile && !imageUrl) {
      openNotification("error", "Validation Failed", "Please upload a package image.");
      return;
    }

    if (!editingPackage || !editingPackage.package_id) {
      console.error("Error: No package ID found for update");
      openNotification("error", "Update Failed", "Editing package data is missing.");
      return;
    }

    console.log("Updating package with ID:", editingPackage.package_id);
    console.log("Updating package with values:", values);

    const formData = new FormData();
    formData.append("package_name", values.package_name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("seat_available", values.seat_available);
    formData.append("rating", values.rating);
    formData.append("provider", values.provider);
    formData.append("user_id", userProfile.user_id);
    formData.append("package_image", imageFile);
    

    fetch(`http://localhost:5000/api/v1/dolphin_packages/update/${editingPackage.package_id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update package");
        }
      })
      .then((data) => {
        openNotification("success", "Package Updated!", `Your package "${values.package_name}" has been successfully updated.`);
        resetForm();
        getDataPackage();
      })
      .catch((error) => {
        console.error("Error updating package:", error);
        openNotification("error", "Update Failed", "There was an error while updating your package. Please try again.");
      });
  };

  const handleDelete = (record) => {
    if (!record.package_id) {
      openNotification("error", "Delete Failed", "Package ID is missing.");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to delete this package?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/dolphin_packages/delete/${record.package_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          openNotification("success", "Package Deleted", "The package has been successfully deleted.");
          getDataPackage();
        } catch (error) {
          console.error("Error deleting package:", error);
          openNotification("error", "Delete Failed", "There was an error while deleting the package. Please try again.");
        }
      },
    });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'package_image',
      key: 'package_image',
      width: 100,
      render: (image) => {
        console.log("ini image",image)
        return <Image
          src={`http://localhost:5000/static/show_image/${image}`}
          alt="Package"
          width={64}
          height={64}
          className="rounded-lg object-cover"
        />
      },
    },
    {
      title: 'Package Name',
      dataIndex: 'package_name',
      key: 'package_name',
      sorter: (a, b) => a.package_name.localeCompare(b.package_name),
    },
    {
      title: 'Provider Name',
      dataIndex: 'provider',
      key: 'provider',
      sorter: (a, b) => a.provider.localeCompare(b.provider),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Available Seats',
      dataIndex: 'seat_available',
      key: 'seat_available',
      width: 150,
      sorter: (a, b) => a.seat_available - b.seat_available,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Pencil className="h-5 w-5" />}
            onClick={() => handleEdit(record)}
            className="text-gray-600 hover:bg-gray-100"
          />
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

  const resetForm = () => {
    form.resetFields();
    setEditingPackage(null);
    setImageUrl('');
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      setImageFile(file);
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-end">
        <Button
          type="primary"
          icon={<Plus className="h-5 w-5" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600"
          size="large"
        >
          Add Package
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1200 }}
        />
      </div>

      <Modal
        title={editingPackage ? 'Edit Package' : 'Add New Package'}
        open={isModalOpen}
        onCancel={resetForm}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (editingPackage) {
              handleUpdatePackage(values);
            } else {
              handlePackage(values);
            }
          }}
          initialValues={{
            package_name: '',
            description: '',
            price: '',
            seat_available: '',
            rating: '',
            provider: '',
          }}
          className="mt-4"
        >
          <Form.Item
            name="package_name"
            label="Package Name"
            rules={[{ required: true, message: 'Please input package name!' }]}
          >
            <Input placeholder="Enter package name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea
              placeholder="Enter description"
              rows={4}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please input price!' }]}
            >
              <InputNumber
                prefix="$"
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                placeholder="Enter price"
              />
            </Form.Item>

            <Form.Item
              name="seat_available"
              label="Available Seats"
              rules={[{ required: true, message: 'Please input available seats!' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Enter available seats"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please input rating!' }]}
          >
            <InputNumber
              min={0}
              max={5}
              step={0.1}
              style={{ width: '100%' }}
              placeholder="Enter rating (0-5)"
            />
          </Form.Item>

          <Form.Item
            name="provider"
            label="Provider Name"
            rules={[{ required: true, message: 'Please input provider name!' }]}
          >
            <Input placeholder="Enter provider name" />
          </Form.Item>

          <Form.Item
            label="Package Image"
          >
            <Upload
              name="package_image"
              accept="image/*"
              maxCount={1}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              onChange={handleImageUpload}
              showUploadList={false}
            >
              <div className="space-y-4">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Package"
                    width={200}
                    className="rounded-lg"
                  />
                )}
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="flex justify-end gap-2 mb-0">
            <Button onClick={resetForm}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              {editingPackage ? 'Update Package' : 'Add Package'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TourPackage;