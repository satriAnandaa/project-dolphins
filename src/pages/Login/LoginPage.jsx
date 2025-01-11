import { Layout, Button, Row, Col, Typography, Form, Input, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SignBG from "../../assets/wadol.png";
import Google from "../../assets/Google.jpeg";
import Instagram from "../../assets/Instagram.jpeg";
import Background from "../../assets/act2.jpg";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendData } from "../../utils/api";

const { Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn, userProfile } = useContext(AuthContext);

  if (isLoggedIn) {
    if (userProfile.role === 2) {
      return <Navigate to="/dashboard" replace />
    } else if (userProfile.role === 1) {
      return <Navigate to="/" replace />
    }
  }


  const handleLogin = async () => {
  try {
    console.log("Debug: Preparing login form data...");
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    console.log("Debug: Sending login request to /api/v1/auth/login...");
    const response = await sendData("/api/v1/auth/login", formData);

    console.log("Debug: Response received from server:", response);

    if (response?.access_token) {
      console.log("Debug: Access token received, proceeding to login...");
      login(response.access_token);
    } else {
      console.warn("Debug: Login failed, no access token in response:", response);
      // Uncomment if using unauthorized state
      // setIsUnauthorized(true);
    }
  } catch (error) {
    console.error("Debug: Error occurred during login:", error.message, error);

    // Uncomment if using unauthorized state
    // setIsUnauthorized(true);
  }
};


  return (
    <Layout className="bg-white fixed inset-0 overflow-hidden ">
      <Content
        className="relative flex flex-col justify-center min-h-screen"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
        <Row gutter={[10, 0]} justify="center">
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
                onFinish={handleLogin}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  className="email input-slide-effect"
                  label="email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    prefix={
                      <div
                        className={`input-prefix-wrapper ${email !== "" ? "input-prefix-hidden" : ""
                          }`}
                      >
                        <UserOutlined />
                      </div>
                    }
                    onChange={(e) => setemail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="password input-slide-effect "
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

                <div className="flex justify-between mt-[-10px]">
                  <Button type="link" className="ml-auto p-0">
                    Forgot Password?
                  </Button>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full hover:bg-blue-500"
                    disabled={email === "" || password === ""}
                  >
                    LOGIN
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
                    Need an account?
                  </Typography.Text>
                  <Button type="link" onClick={() => navigate("/create")}>
                    Create Account
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;
