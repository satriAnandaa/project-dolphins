import { Layout, Button, Row, Col, Typography, Form, Input, Card, Select } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import SignBG from "../../assets/wadol.png";
import Google from "../../assets/Google.jpeg";
import Instagram from "../../assets/Instagram.jpeg";
import Background from "../../assets/act2.jpg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendData } from "../../utils/api";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);

  const handleSignup = async () => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("phone_number", phone);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const response = await sendData("/api/v1/auth/register", formData);
      console.log("ini response", response)
      if (response?.message === 'OK') {
        console.log("User registered successfully");
        navigate("/login", { replace: true });
      } else {
        console.error("Registration failed", response?.message);
      }
    } catch (error) {
      console.error("An error occurred during registration", error);
    }
  };

  return (
    <Layout className="bg-white min-h-screen overflow-auto">
      <Content
        className="relative flex flex-col justify-center min-h-screen"
        style={{ position: "relative" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <Row gutter={[10, 0]} justify="center" className="py-8">
          <Col xs={24} lg={8} md={12}>
            <div className="h-36"></div>
            <Card className="p-0 -mt-20 shadow-xl rounded-lg pb-0 bg-gradient-to-b from-[#d1edff] to-white">
              <img
                src={SignBG}
                alt="Sign Background"
                className="w-28 h-auto -mb-6 rounded-lg mx-auto block"
              />
              <Title className="text-center text-gray-600 mt-4" level={5}>
                Welcome to Watching Dolphins
              </Title>
              <Form
                onFinish={handleSignup}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  className="username input-slide-effect"
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your username"
                    prefix={
                      <div
                        className={`input-prefix-wrapper ${username !== "" ? "input-prefix-hidden" : ""
                          }`}
                      >
                        <UserOutlined />
                      </div>
                    }
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: 'email', message: "Please enter a valid email!" }
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    prefix={
                      <div className={`input-prefix-wrapper ${email !== "" ? "input-prefix-hidden" : ""}`}>
                        <MailOutlined />
                      </div>
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}
                >
                  <Input
                    placeholder="Phone"
                    prefix={<PhoneOutlined />}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="password input-slide-effect"
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    prefix={
                      <div
                        className={`input-prefix-wrapper ${password !== "" ? "input-prefix-hidden" : ""
                          }`}
                      >
                        <LockOutlined />
                      </div>
                    }
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    { required: true, message: "Please select a role!" },
                  ]}
                >
                  <Select
                    placeholder="Select your role"
                    onChange={(value) => setRole(value)}
                  >
                    <Option value={1}>User</Option>
                    <Option value={2}>Admin</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full hover:bg-blue-500"
                    disabled={username === "" || password === "" || email === "" || phone === "" || role === null}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-40 h-px bg-gray-300"></div>
                  <Typography.Text type="secondary" className="text-gray-500">
                    OR
                  </Typography.Text>
                  <div className="w-40 h-px bg-gray-300"></div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <div className="w-40 h-12 border rounded-lg shadow-xl flex items-center justify-center bg-white">
                    <img
                      src={Google}
                      alt="Google Sign In"
                      className="w-7 h-7 "
                    />
                  </div>
                  <div className="w-40 h-12 border rounded-lg shadow-xl flex items-center justify-center bg-white">
                    <img
                      src={Instagram}
                      alt="Instagram Sign In"
                      className="w-7 h-7 "
                    />
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <Typography.Text type="secondary">
                    Already have an account?
                  </Typography.Text>
                  <Button type="link" onClick={() => navigate("/login")}>Login</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateAccount;
