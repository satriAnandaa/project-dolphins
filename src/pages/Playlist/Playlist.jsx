import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  List,
  Skeleton,
  Drawer,
  Form,
  Input,
  Button,
  Popconfirm,
  message,
  Col,
  Row,
  Modal,
  Select,
  FloatButton
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./Playlist.css";
import { deleteData, getData, sendData } from "../../utils/api"; 

const { Title, Text } = Typography;


const Playlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [idSelected, setIdSelected] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchText, setSearchText] = useState([]);

  
  useEffect(() => {
    getDataPlaylist();
  }, []);

  
  const getDataPlaylist = () => {
    setLoading(true);
    getData("/api/playlist/24")
      .then((resp) => {
        setLoading(false);
        console.log("API Response:", resp);
        if (resp && Array.isArray(resp.datas)) {
          setDataSource(resp.datas); 
          setData(resp.datas); 
        } else {
          setError("Invalid response format");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching data:", err);
        setError(err);
      });
  };

  
  const handleDrawer = () => {
    setIsDrawer(true);
  };

 
  const onCloseDrawer = () => {
    if (isEdit) {
      setIsEdit(false);
      form.resetFields();
    }
    setIsDrawer(false);
  };

  const handleDrawerEdit = (record) => {
    setIsDrawer(true);
    setIsEdit(true);
    setIdSelected(record?.id_play);
    form.setFieldsValue({
      play_name: record?.play_name,
      play_url: record?.play_url,
      play_thumbnail: record?.play_thumbnail,
      play_genre: record?.play_genre,
      play_description: record?.play_description
    });
  };

  
  const handleSubmit = () => {
    const playName = form.getFieldValue("play_name");
    const playUrl = form.getFieldValue("play_url");
    const playThumbnail = form.getFieldValue("play_thumbnail");
    const playGenre = form.getFieldValue("play_genre");
    const playDescription = form.getFieldValue("play_description");

    const formData = new FormData();
    formData.append("play_name", playName);
    formData.append("play_url", playUrl);
    formData.append("play_thumbnail", playThumbnail);
    formData.append("play_genre", playGenre);
    formData.append("play_description", playDescription); 

    const url = isEdit ? `/api/playlist/update/${idSelected}` : "/api/playlist/24";
    sendData(url, formData)
      .then((resp) => {
        if (resp) {
          showAlert("success", "Data sent successfully", "Data has been saved successfully");
          form.resetFields();
          getDataPlaylist(); 
          onCloseDrawer();
        } else {
          showAlert("error", "Submission failed", "Data could not be saved");
        }
      })
      .catch((err) => {
        console.error(err);
        showAlert("error", "Submission failed", "Data could not be saved");
      });
  };

  
  const confirmDelete = (record_id) => {
    showAlert("success", "Data deleted", `Successfully deleted video ${record_id}`);
    const url = `/api/playlist/${record_id}`;
    const params = new URLSearchParams();
    params.append("id", record_id);
    deleteData(url, params)
      .then((resp) => {
        if (resp?.status === 200) {
          showAlert("success", "Data deleted", "Video deleted successfully");
          getDataPlaylist(); 
          form.resetFields();
          setIsModalVisible(false);
          onCloseDrawer();
        } else {
          showAlert("error", "Failed", "Failed to delete video");
        }
      })
      .catch((err) => {
        console.error(err);
        showAlert("error", "Failed", "Failed to delete video");
      });
  };

  
  const showAlert = (type, title, description) => {
    message[type]({
      content: description,
      duration: 3,
    });
  };

  
  const handleCardClick = (item) => {
    setSelectedVideo(item);
    setIsModalVisible(true);
  };

  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  
  const renderDrawer = () => {
    return (
      <Drawer
        title={isEdit ? "Edit Video" : "Create Video"}
        onClose={onCloseDrawer}
        open={isDrawer}
        extra={
          <Button
            htmlType="submit"
            type="primary"
            onClick={handleSubmit}
            style={{ backgroundColor: isEdit ? "green" : "blue", color: "white" }}
          >
            Submit
          </Button>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="play_name" label="Video Name" required>
            <Input />
          </Form.Item>
          <Form.Item name="play_url" label="Video URL" required>
            <Input />
          </Form.Item>
          <Form.Item name="play_thumbnail" label="Thumbnail URL" required>
            <Input />
          </Form.Item>
          <Form.Item
            name="play_genre"
            label="Genre"
            rules={[{ required: true, message: "Please select a genre!" }]}
          >
            <Select placeholder="Select a genre">
              <Select.Option value="music">Music</Select.Option>
              <Select.Option value="song">Song</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="play_description" label="Description" required>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());


  };

  let dataSourceFiltered = dataSource.filter((item) => {
    return (
      (item?.play_name?.toLocaleLowerCase() || " ").includes(searchText) ||
      (item?.play_genre?.toLocaleLowerCase() || " ").includes(searchText)
    );
  });

  
  const renderModal = () => {
    if (!selectedVideo) return null;

    return (
      <Modal
        title={selectedVideo.play_name}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <div>
          <img
            src={selectedVideo.play_thumbnail}
            alt={selectedVideo.play_name}
            style={{ width: "100%", marginBottom: "15px" }}
          />
          <div>
            <Button
              type="link"
              href={selectedVideo.play_url}
              target="_blank"
              icon={<VideoCameraOutlined />}
              style={{ marginTop: "20px" }}
            >
              Watch here
            </Button>
          </div>
          <Text strong>Genre:</Text> {selectedVideo.play_genre}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Description:</Text>
            <p>{selectedVideo.play_description}</p>
          </div>
          <Text type="secondary">
            Created at: {new Date(selectedVideo.created_at).toLocaleDateString()}
          </Text>
        </div>
      </Modal>
    );
  };

 
  if (loading) return <Skeleton active />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container-play">
      {/* Header Section */}
      <div className="header-container bg-transparent  ">
        <img src="src/assets/Header.png" alt="Header" className="header-image w-100" />
      </div>

      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="circle-box h-full w-full bg-white shadow-none">
            <Title level={2}>Video Playlist</Title>
            <Input
              placeholder="Search here .... "
              prefix={<SearchOutlined />}
              className="header-search"
              allowClear
              size={"large"}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleDrawer}
              style={{ marginBottom: "20px" }}
            >
              Add New Video
            </Button>
            {renderDrawer()}


            {dataSourceFiltered.length > 0 && loading ?  <Skeleton active /> : <List

              grid={{ gutter: 16, column: 4 }}

              dataSource={dataSourceFiltered ? dataSourceFiltered : []}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    cover={<img alt={item.play_name} src={item.play_thumbnail} />}
                    actions={[
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDrawerEdit(item);
                        }}
                      >
                        Edit
                      </Button>,
                      <Popconfirm
                        title="Are you sure you want to delete this video?"
                        onConfirm={() => confirmDelete(item.id_play)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="link"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={(e) => e.stopPropagation()} 
                        >
                          Delete
                        </Button>
                      </Popconfirm>,
                    ]}
                    onClick={() => handleCardClick(item)} 
                  >
                    <Card.Meta
                      title={<><VideoCameraOutlined /> {item.play_name}</>}
                      description={`Genre: ${item.play_genre}`}
                    />
                  </Card>
                </List.Item>
              )}

            /> }
          </Card>
        </Col>
      </Row>

      {renderModal()}
    </div>
  );
};

export default Playlist;
