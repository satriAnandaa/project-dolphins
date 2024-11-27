import { Col, Row, Typography, Card, Form, Input, Button, List, Avatar, Pagination, Drawer, message, Tooltip, Upload } from "antd";
import { useState } from "react";
import "./Profile.css";
import { InstagramOutlined, WhatsAppOutlined, FacebookOutlined, YoutubeOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // State untuk menyimpan data profile
  const [editingField, setEditingField] = useState(null); // Menyimpan field yang sedang diedit
  const [profileData, setProfileData] = useState({
    name: "I Made Wipayoga",
    birthDate: "20 November 2003",
    phone: "081236744196",
    address: "Unggahan, Seririt, Buleleng, Bali",
    email: "madewipayoga2003@gmail.com",
    notifications: "On",
    username: "wipayoga",
    password: "******",
    photo: "/src/assets/wipa.jpg"
  });

  const navigate = useNavigate();

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } }); // Navigasi ke halaman booking dengan state
  };

  // Data teman-teman (friends) dengan gambar
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

  // Data notifikasi dengan waktu statis
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
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, favorite: !tour.favorite } : tour)));
  };

  // Pagination untuk notifikasi dan favorit
  const [notificationPage, setNotificationPage] = useState(1);  // Halaman saat ini untuk notifikasi
  const [favoritePage, setFavoritePage] = useState(1);  // Halaman saat ini untuk favorit
  const notificationsPerPage = 2;  // Menentukan jumlah notifikasi per halaman
  const favoritesPerPage = 4;  // Menentukan jumlah favorit per halaman

  const onNotificationPageChange = (page) => {
    setNotificationPage(page); // Fungsi untuk mengubah halaman notifikasi
  };

  const onFavoritePageChange = (page) => {
    setFavoritePage(page); // Set halaman saat ini
  };

  // Menghitung data favorit untuk halaman saat ini
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
      message.success(`${editingField.charAt(0).toUpperCase() + editingField.slice(1)} Success Updated!`);
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
    <div className="profile-container">
      {/* Profile Header */}
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Card className="profile-card welcome-card">
          <div className="profile-image-container" style={{ position: "relative", display: "inline-block" }}>
          <img
            src={profileData.photo} // Gunakan properti photo
            alt="Profile"
            className="profile-image"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            />
              <Tooltip title="Edit Photo">
                <EditOutlined
                  onClick={() => handleEdit("photo")}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "24px",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </div>
            <Title level={2} style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
              Welcome, {profileData.name} From Joy Team!
            </Title>
           {/* Social Media Icons positioned in the center */}
           <div className="social-media-icons" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <a href="https://www.instagram.com/wipayoga?igsh=OXR6dGg5enp6ZDli" target="_blank" rel="noopener noreferrer">
                <Tooltip title="Instagram">
                <InstagramOutlined className="social-icon" style={{ color: 'white', fontSize: '24px', margin: '0 10px' }} />
                </Tooltip>
              </a>
              <a href="https://wa.me/6281236744196" target="_blank" rel="noopener noreferrer" >
                <Tooltip title="WhatsApp">
                <WhatsAppOutlined className="social-icon" style={{ color: 'white', fontSize: '24px', margin: '0 10px' }} />
                </Tooltip>
              </a>
              <a href="https://www.facebook.com/wipa.yoga?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" >
                <Tooltip title="Facebook">
                <FacebookOutlined className="social-icon" style={{ color: 'white', fontSize: '24px', margin: '0 10px' }} />
                </Tooltip>
              </a>
              <a href="https://www.youtube.com/@imadewipayoga3682" target="_blank" rel="noopener noreferrer" >
                <Tooltip title="Youtube">
                <YoutubeOutlined className="social-icon" style={{ color: 'white', fontSize: '24px', margin: '0 10px' }} />
                </Tooltip>
              </a>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Profile Content */}
      <Row gutter={[24, 24]} justify="center">
        {/* Main Info */}
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {/* Basic Info & Friends */}
            <Col xs={24} md={12}>
              <Card className="profile-card info-card">
                <Title level={4} className="card-title" style={{ textAlign: 'center', marginBottom: '20px' }} >Basic Info</Title>
                <Form layout="vertical">
                  {["name", "birthDate", "phone", "address"].map((field) => (
                    <div key={field} className="profile-item">
                      <Text strong>{field === "name" ? "Name" : field === "birthDate" ? "Birth Date" : field === "phone" ? "Phone" : "Address"}</Text>
                      <Text onClick={() => handleEdit(field)} style={{ cursor: "pointer" }}>
                        {profileData[field]}
                      </Text>
                    </div>
                  ))}
                </Form>
              </Card>

              <Card className="profile-card friends-card">
              <Title level={4} className="card-title" style={{ textAlign: 'center', marginBottom: '20px' }}>Friends</Title>
              <List
                dataSource={friends}
                renderItem={(friend) => (
                  <List.Item style={{ padding: '10px 15px', alignItems: 'center' }}>
                    <List.Item.Meta
                      avatar={<Avatar src={friend.avatar} size={50} />}
                      title={
                        <Text strong style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
                          {friend.name}
                        </Text>
                      }
                      style={{ display: 'flex', alignItems: 'center' }}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

            {/* Account Info & Notifications */}
            <Col xs={24} md={12}>
              <Card className="profile-card account-card">
                <Title level={4} className="card-title" style={{ textAlign: 'center', marginBottom: '20px' }} >Account</Title>
                <Form layout="vertical">
                  {["username", "password", "email", "notifications"].map((field) => (
                    <div key={field} className="profile-item">
                      <Text strong>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                      <Text onClick={() => handleEdit(field)} style={{ cursor: "pointer" }}>
                        {profileData[field]}
                      </Text>
                    </div>
                  ))}
                </Form>
              </Card>

              {/* Notifications Section */}
              <Card className="profile-card notifications-card">
                <Title level={4} className="card-title" style={{ textAlign: 'center', marginBottom: '20px' }} >Notifications</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={notifications.slice(
                    (notificationPage - 1) * notificationsPerPage,
                    notificationPage * notificationsPerPage
                  )}
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
                  simple={{ readOnly: true }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card className="profile-card favorites-card">
            <Title level={4} className="card-title" style={{ textAlign: 'center', marginBottom: '20px' }} >Favorite Tour</Title>
            <div className="cards-container">
              {/* Hanya menampilkan data tur yang relevan dengan halaman saat ini */}
              {favoriteData.map((tour) => (
                <div key={tour.id} className="card">
                  <img src={tour.image} alt={`Tour ${tour.id}`} className="card-img" />
                  <div className="card-content">
                    <p className="rating">⭐ {tour.rating}</p>
                    <p className="price">{tour.price}</p>
                    <p className="description">{tour.description}</p>
                    <p className="package">{tour.package}</p>
                    <div className="buttons-container">
                      <button
                        className={`favorite-btn ${tour.favorite ? 'favorite' : ''}`}
                        onClick={() => toggleFavorite(tour.id)}
                      >
                        {tour.favorite ? "❤️" : "🤍"}
                      </button>
                      <button className="book-btn" onClick={() => handleBooking(tour)}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              current={favoritePage}
              pageSize={favoritesPerPage}
              total={tours.length}
              onChange={onFavoritePageChange}
              simple={{ readOnly: true }}
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
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cencel
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        }
      >
        {editingField === "photo" ? (
          <Form layout="vertical">
            <Form.Item label="Upload Image">
              <Upload accept="image/*" beforeUpload={handlePhotoFileChange} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Select Photo</Button>
              </Upload>
            </Form.Item>
            {tempPhoto && (
              <div style={{ marginTop: "16px" }}>
                <p>Preview:</p>
                <img
                  src={tempPhoto}
                  alt="Preview"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </Form>
        ) : (
          <Form layout="vertical">
            <Form.Item label={editingField ? editingField.charAt(0).toUpperCase() + editingField.slice(1) : ""}>
              <Input value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
            </Form.Item>
          </Form>
        )}
      </Drawer>
      
    </div>
  );
};

export default Profile;
