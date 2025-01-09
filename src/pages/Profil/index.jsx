import {
  Col,
  Row,
  Typography,
  Card,
  Form,
  Input,
  Button,
  List,
  Avatar,
  Pagination,
  Drawer,
  message,
  Tooltip,
  Upload,
} from "antd";
import { useState, useEffect, useContext } from "react";
import {
  InstagramOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
import { useNavigate } from "react-router-dom";
import { getDataPrivate } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  // State untuk menyimpan data profile
  const [editingField, setEditingField] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "I Made Wipayoga",
    birthDate: "20 November 2003",
    phone: "081236744196",
    address: "Unggahan, Seririt, Buleleng, Bali",
    email: "madewipayoga2003@gmail.com",
    notifications: "On",
    username: "wipayoga",
    password: "******",
    photo: "/src/assets/wipa.jpg",
  });

  const navigate = useNavigate();

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } });
  };

  const friends = [
    { name: "Made Satria", avatar: 'https://th.bing.com/th/id/OIP.XkI1hQ1473nHBlmOG32g2QHaEK?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Wisdayani", avatar: 'https://th.bing.com/th/id/OIP.hZe_QRkkBBxq4oan5zaShQHaHa?w=188&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Ayupuspa Sari", avatar: 'https://th.bing.com/th/id/OIP.dpUmhtAWlmUU8n1enYn4SQHaEK?w=291&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Anggita Cahya", avatar: 'https://th.bing.com/th/id/OIP.d2h1qez9SbvV5UWosCgv0QHaE8?w=244&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "John Doe", avatar: 'https://th.bing.com/th/id/OIP.p8R5aMx8IonOT_hSzYVt8wHaE8?w=252&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Emma Watson", avatar: 'https://th.bing.com/th/id/OIP.Vhi6idhB6Ltt2Tf9QhA0DAHaDt?w=289&h=175&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Oliver Smith", avatar: 'https://th.bing.com/th/id/OIP._9l5ToRceauadFkhzxgRLwHaE8?w=267&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Mia Johnson", avatar: 'https://th.bing.com/th/id/OIP.lgyoAnP9acuDZgsAt-jEJgHaFj?w=222&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Liam Brown", avatar: 'https://th.bing.com/th/id/OIP.hZe_QRkkBBxq4oan5zaShQHaHa?w=188&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
    { name: "Sophia Taylor", avatar: 'https://th.bing.com/th/id/OIP.XkI1hQ1473nHBlmOG32g2QHaEK?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' },
  ];

  const notifications = [
    { message: "Cuaca cerah di Lovina hari ini.", time: "17 minutes ago" },
    { message: "Kunjungi Pantai Lovina untuk melihat lumba-lumba di pagi hari!", time: "43 minutes ago" },
    { message: "Acara festival seni akan diadakan di Lovina minggu depan.", time: "2 hours ago" },
    { message: "Jangan lewatkan konser musik lokal yang akan diadakan malam ini di pusat kota!", time: "4 hours ago" },
    { message: "Taman Nasional Bali Barat mengundang Anda untuk berpartisipasi dalam kegiatan pelestarian alam.", time: "1 days ago" },
    { message: "Pameran seni di Galeri Lovina akan dimulai pada hari Sabtu.", time: "2 days ago" },
    { message: "Ada diskon besar untuk penginapan di Lovina, hanya berlaku hingga akhir bulan!", time: "4 days ago" },
  ];

  const initialTours = [
    { id: 1, image: "src/assets/dol2.jpg", rating: 4.5, favorite: true, price: "IDR 100.000", description: "Explore the beautiful beaches and underwater life.", package: "Watch Dolphins" },
    { id: 2, image: "src/assets/dol3.jpg", rating: 4.7, favorite: true, price: "IDR 120.000", description: "Enjoy swimming with dolphins and snorkeling.", package: "Watch and Snorkeling" },
    { id: 3, image: "src/assets/dol2.jpg", rating: 4.3, favorite: true, price: "IDR 110.000", description: "A guided tour to discover dolphin habitats.", package: "Watch and Snorkeling" },
    { id: 4, image: "src/assets/dol5.jpg", rating: 4.9, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 5, image: "src/assets/dol6.jpg", rating: 4.0, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 6, image: "src/assets/dol7.jpg", rating: 3.9, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 7, image: "src/assets/dol8.jpg", rating: 3.5, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 8, image: "src/assets/dol9.jpg", rating: 3.1, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 9, image: "src/assets/dol9.jpg", rating: 3.3, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 10, image: "src/assets/dol8.jpg", rating: 3.2, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 11, image: "src/assets/dol2.jpg", rating: 3.5, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 12, image: "src/assets/dol3.jpg", rating: 3.1, favorite: true, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
  ];

  const [tours, setTours] = useState(initialTours);

  const toggleFavorite = (id) => {
    setTours(
      tours.map((tour) =>
        tour.id === id ? { ...tour, favorite: !tour.favorite } : tour
      )
    );
  };

  const [notificationPage, setNotificationPage] = useState(1);
  const [favoritePage, setFavoritePage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const { userProfile } = useContext(AuthContext)


  const notificationsPerPage = 2;
  const favoritesPerPage = 4;


  useEffect(() => {
    getDataPackages()

  }, [])

  const getDataPackages = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/dolphin_packages/read/" + userProfile.user_id)
      .then((resp) => {
        setIsLoading(false);
        if (resp?.data) {
          // Menyaring hanya paket yang difavoritkan oleh user
          const favoritePackages = resp.data.filter(item => item.is_favorite === 1);
          setDataSource(favoritePackages); // Menyimpan hanya paket yang difavoritkan
        } else {
          console.log("Can't fetch data");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Error:', err);
      });
  };
  



  const onNotificationPageChange = (page) => {
    setNotificationPage(page);
  };

  const onFavoritePageChange = (page) => {
    setFavoritePage(page);
  };

  const favoriteData = tours.slice(
    (favoritePage - 1) * favoritesPerPage,
    favoritePage * favoritesPerPage
  );

  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const [tempPhoto, setTempPhoto] = useState(null);

  const handleEdit = (field) => {
    setEditingField(field);
    if (field === "photo") {
      setTempPhoto(null);
    } else {
      setTempValue(profileData[field]);
    }
    setVisibleDrawer(true);
  };

  const handleSave = () => {
    if (editingField === "photo" && tempPhoto) {
      setProfileData({ ...profileData, photo: tempPhoto });
      message.success("Photo Profile Succes Updated!");
    } else if (editingField) {
      setProfileData({ ...profileData, [editingField]: tempValue });
      message.success(
        `${editingField.charAt(0).toUpperCase() + editingField.slice(1)} Success Updated!`
      );
    }
    setVisibleDrawer(false);
    setEditingField(null);
  };

  const handleCancel = () => {
    setVisibleDrawer(false);
    setEditingField(null);
    setTempValue("");
    setTempPhoto(null);
  };

  const handlePhotoFileChange = (file) => {
    const url = URL.createObjectURL(file);
    setTempPhoto(url);
    return false;
  };

  return (
    <div className="p-5 bg-blue-50">
      {/* Profile Header */}
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Card className="border-none rounded-lg shadow-lg p-5 mb-5 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-sm"
              style={{ backgroundImage: "url('/src/assets/lovina-2.jpg')" }}
            ></div>
            <div className="flex flex-col items-center relative z-10"> {/* Menggunakan Flexbox untuk memusatkan konten */}
              <div className="relative inline-block">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="w-44 h-44 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
                />
                <Tooltip title="Edit Photo">
                  <EditOutlined
                    onClick={() => handleEdit("photo")}
                    className="absolute top-2 right-2 text-2xl text-white bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                  />
                </Tooltip>
              </div>
              <Title level={2} className="text-white text-shadow-lg">
                Welcome, {profileData.name} From Joy Team!
              </Title>
              <div className="flex justify-center mt-4">
                <a href="https://www.instagram.com/wipayoga?igsh=OXR6dGg5enp6ZDli" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="Instagram">
                    <InstagramOutlined className="text-white text-2xl mx-2" />
                  </Tooltip>
                </a>
                <a href="https://wa.me/6281236744196" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="WhatsApp">
                    <WhatsAppOutlined className="text-white text-2xl mx-2" />
                  </Tooltip>
                </a>
                <a href="https://www.facebook.com/wipa.yoga?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="Facebook">
                    <FacebookOutlined className="text-white text-2xl mx-2" />
                  </Tooltip>
                </a>
                <a href="https://www.youtube.com/@imadewipayoga3682" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="Youtube">
                    <YoutubeOutlined className="text-white text-2xl mx-2" />
                  </Tooltip>
                </a>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Profile Content */}
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card className="border-none rounded-lg shadow-lg p-5 mb-5 h-[490px]">
                <Title level={4} className="text-center mb-5">BASIC INFO</Title>
                <Form layout="vertical">
                  <div className="border-b border-gray-300 mb-2">
                    <div className="py-2 flex justify-between items-center font-bold text-black">
                      <Text>Field</Text>
                      <Text>Value</Text>
                    </div>
                  </div>
                  {["name", "birthDate", "phone", "address"].map((field) => (
                    <div key={field} className="py-3 flex justify-between items-center border-b border-gray-300 border-dashed">
                      <Text className="text-black">{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                      <Text onClick={() => handleEdit(field)} className="cursor-pointer text-black hover:underline">{profileData[field]}</Text>
                    </div>
                  ))}
                </Form>
              </Card>

              <Card className="border-none rounded-lg shadow-lg p-5 mb-5 h-[430px] overflow-y-auto">
                <Title level={4} className="text-center mb-5">FRIEND'S</Title>
                <List
                  dataSource={friends}
                  renderItem={(friend) => (
                    <List.Item className="py-2 flex items-center">
                      <List.Item.Meta
                        avatar={<Avatar src={friend.avatar} size={50} />}
                        title={<Text strong className="text-lg">{friend.name}</Text>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="border-none rounded-lg shadow-lg p-5 mb-5 h-[490px]" >
                <Title level={4} className="text-center mb-5">ACCOOUNT</Title>
                <Form layout="vertical">
                  {["username", "password", "email", "notifications"].map((field) => (
                    <div key={field} className="py-3 flex justify-between items-center border-b border-gray-300 border-dashed">
                      <Text strong>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                      <Text onClick={() => handleEdit(field)} className="cursor-pointer">{profileData[field]}</Text>
                    </div>
                  ))}
                </Form>
              </Card>

              <Card className="border-none rounded-lg shadow-lg p-5 mb-5 h-[430px] overflow-y-auto">
                <Title level={4} className="text-center mb-5">NOTIFICATION'S</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={notifications.slice((notificationPage - 1) * notificationsPerPage, notificationPage * notificationsPerPage)}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          <>
                            <Text>{item.message}</Text>
                            <br />
                            <Text type="secondary">{item.time}</Text>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
                <Pagination
                  current={notificationPage}
                  pageSize={notificationsPerPage}
                  total={notifications.length}
                  onChange={onNotificationPageChange}
                  simple
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card className="border-none rounded-lg shadow-lg p-5 mb-5">
            <Title level={4} className="text-center mb-5">FAVORITE TOUR</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dataSource?.map((tour) => (
                <div key={tour.id} className="border rounded-lg shadow-lg overflow-hidden">
                  <img src={tour.image} alt={`Tour ${tour.id}`} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="text-lg font-semibold">⭐ {tour.rating}</p>
                    <p className="text-xl font-bold">{tour.price}</p>
                    <p className="text-gray-700">{tour.description}</p>
                    <p className="text-gray-500">{tour.package}</p>
                    <p className="text-sm text-gray-600">Seats Available: {tour.seat_available}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className={`text-2xl ${tour.favorite ? 'text-red-500' : 'text-gray-400'}`}
                        onClick={() => toggleFavorite(tour.id)}
                      >
                        {tour.is_favorite ? "❤️" : "🤍"}
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() => handleBooking(tour)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              className="mt-10"
              current={favoritePage}
              pageSize={favoritesPerPage}
              total={dataSource.length} // Menggunakan length dari dataSource yang sudah difilter
              onChange={onFavoritePageChange}
              simple
            />
          </Card>

        </Col>
      </Row>

      <Drawer
        title={
          editingField === "photo"
            ? "Edit Photo Profile"
            : `Edit ${editingField ? editingField.charAt(0).toUpperCase() + editingField.slice(1) : ""}`
        }
        width={400}
        onClose={handleCancel}
        open={visibleDrawer}
        footer={
          <div className="flex justify-end">
            <Button onClick={handleCancel} className="mr-2">Cancel</Button>
            <Button type="primary" onClick={handleSave}>Save</Button>
          </div>
        }
      >
        {editingField === "photo" ? (
          <Form layout="vertical">
            <Form.Item label="Upload Image">
              <Upload
                accept="image/*"
                beforeUpload={handlePhotoFileChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              </Upload>
            </Form.Item>
            {tempPhoto && (
              <div className="mt-4">
                <p>Preview:</p>
                <img src={tempPhoto} alt="Preview" className="w-full rounded-lg" />
              </div>
            )}
          </Form>
        ) : (
          <Form layout="vertical">
            <Form.Item label={editingField ? editingField.charAt(0).toUpperCase() + editingField.slice(1) : ""}>
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default Profile;