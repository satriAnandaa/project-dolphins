import { Col, Row, Typography, Card, Table, Progress, Divider } from "antd";
import {
  DollarOutlined,
  OrderedListOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";

const { Title, Text } = Typography;

function EChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChartData.options}
          series={eChartData.series}
          type="bar"
          height={220}
        />
      </div>
      {/* <div className="chart-visitor">
        <Title level={5}>Dolphin-Watching Bookings</Title>
        <Paragraph className="lastweek">
          Growth compared to last week <span className="bnb2">+15%</span>
        </Paragraph>
      </div>
      <div className="chart-details">
        <Row gutter={[16, 16]}>
          {items.map((item, index) => (
            <Col key={index} span={6}>
              <div className="stat-item">
                <Title level={4}>{item.Title}</Title>
                <Paragraph>{item.user}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

const items = [
  {
    Title: "1,2K",
    user: "Bookings",
  },
  {
    Title: "6.5m",
    user: "Clicks",
  },
  {
    Title: "IDR 15.4M",
    user: "Revenue",
  },
  {
    Title: "120",
    user: "Tours",
  },
];

const eChartData = {
  series: [
    {
      name: "Bookongs",
      data: [450.000, 200.000, 100.000, 220.000, 500.000, 100.000, 400.000, 230.000, 500.000],
      color: "#fff",
    },
  ],

  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "IDR " + val;
        },
      },
    },
  },
};

const dataSource = [
  {
    key: "1",
    product: "Snorkeling",
    date: "Jul 12th 2024",
    status: "Completed",
  },
  {
    key: "2",
    product: "Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Pending",
  },
  {
    key: "3",
    product: "Snorkling & Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Pending",
  },
  {
    key: "4",
    product: "Snorkling & Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Completed",
  },
  {
    key: "5",
    product: "Watching Dolphin",
    date: "Jul 12th 2024",
    status: "Completed",
  },
];

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

function Dashboard() {
  // Filter data sesuai dengan dataSource
  const categories = dataSource.map((item) => item.product); // Menggunakan nama produk sebagai kategori
  const values = dataSource.map(() => Math.floor(Math.random() * 100) + 1); // Menggunakan nilai acak untuk contoh

  return (
    <div className="layout-content">
      <Row gutter={[24, 24]}>
        {/* Bagian Kiri */}
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card bordered={false} className="dashboard-card">
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#f6ffed" }}>
                      <DollarOutlined style={{ fontSize: "32px", color: "#52c41a" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        {items[0].Title}
                      </Title>
                      <Text>Net Income</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#fff7e6" }}>
                      <BarChartOutlined style={{ fontSize: "32px", color: "#fa8c16" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        {items[2].Title}
                      </Title>
                      <Text>Total Return</Text>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                      <OrderedListOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
                      <Title level={3} style={{ margin: "10px 0" }}>
                        {items[3].Title}
                      </Title>
                      <Text>Total Bookings</Text>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card bordered={false} className="dashboard-card">
                <Title level={4}>Revenue</Title>
                <EChart
                  color={"#1890ff"}
                  backgroundColor={"#f0f2f5"}
                  categories={categories}
                  values={values}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Bagian Kanan */}
        <Col xs={24} lg={8}>
          <Card bordered={false} className="dashboard-card">
            <Title level={4}>Total View Performance</Title>
            <Progress type="circle" percent={68} format={(percent) => `${percent}%`} />
            <Divider />
            <Text>Here are some tips on how to improve your score:</Text>
            <ul>
              <li>Optimize product descriptions.</li>
              <li>Increase advertising budget.</li>
            </ul>
          </Card>
          <Card bordered={false} className="dashboard-card" style={{ marginTop: 24 }}>
            <Title level={4}>Recent Transactions</Title>
            <Table
              size="small"
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 3 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;





