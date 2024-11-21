import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import SignBG from "../../assets/WADOL.jpg";
import Google from "../../assets/Google.jpeg";
import Instagram from "../../assets/instagram.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateAccount.css"; // Importing the CSS file

const { Title } = Typography;
const { Content } = Layout;

const CreateAcoount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
    console.log(username, password);
    navigate("/login", { replace: true });
  };

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin login-container">
        <Row gutter={[10, 0]} justify="center">
          <Col xs={{ span: 24 }} className="col-center">
            <img src={SignBG} alt="" className="sign-img" />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <Title className="mb-15 text-center">Sign Up</Title>
            <Title className="font-regular text-muted text-center" level={5}>
              Create a free account
            </Title>
            <Form onFinish={handleSignup} layout="vertical" className="row-col">
              <Form.Item
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  placeholder="Name"
                  prefix={
                    <div
                      className={`input-prefix-wrapper ${name !== "" ? "input-prefix-hidden" : ""}`}
                    >
                      <UserOutlined />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                rules={[{ required: true, message: "Please input your phone!" }]}
              >
                <Input
                  placeholder="Phone"
                  prefix={
                    <div
                      className={`input-prefix-wrapper ${phone !== "" ? "input-prefix-hidden" : ""}`}
                    >
                      <PhoneOutlined />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input
                  placeholder="Email"
                  prefix={
                    <div
                      className={`input-prefix-wrapper ${username !== "" ? "input-prefix-hidden" : ""}`}
                    >
                      <MailOutlined />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={
                    <div
                      className={`input-prefix-wrapper ${password !== "" ? "input-prefix-hidden" : ""}`}
                    >
                      <LockOutlined />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="full-width-btn"
                  disabled={username === "" || password === "" || name === "" || phone === ""}
                >
                  SIGN UP
                </Button>
              </Form.Item>

              <div className="centered-text">
                <Typography.Text type="secondary">OR</Typography.Text>
              </div>

              <div className="social-icons">
                <img src={Google} alt="Google" className="social-icon" />
                <img src={Instagram} alt="Instagram" className="social-icon" />
              </div>

              <div className="margin-top-10 text-center">
                <Typography.Text type="secondary">Already have an account?</Typography.Text>
                <Button type="link" onClick={() => navigate("/login")}>
                  SIGN IN
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateAcoount;
