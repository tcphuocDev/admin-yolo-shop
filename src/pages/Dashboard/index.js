import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import { Statistic, Card, Row, Col, Table } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  listProduct,
  listProductSell,
} from "../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardCustomer,
  dashboardOrder,
  dashboardOrderMoney,
  dashboardSummary,
} from "../../redux/actions/dashboard.action";
import { formatMoney } from "../../common/common";
import DateSelection from "../../components/DateSelection";
import * as moment from "moment";

moment.locale("vi", {
  week: {
    dow: 1,
  },
});
moment.locale("vi");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Thống kê đơn hàng",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Thống thu nhập",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Dashboard() {
  const [from, setFrom] = useState(moment().startOf("week"));
  const [to, setTo] = useState(moment().endOf("week"));
  const [from1, setFrom1] = useState(moment().startOf("week"));
  const [to1, setTo1] = useState(moment().endOf("week"));
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const params = {
      startDate: from ? from.toISOString() : "",
      endDate: moment(to).startOf("day").toISOString(),
    };

    const params1 = {
      startDate: from1 ? from1.toISOString() : "",
      endDate: moment(to1).startOf("day").toISOString(),
    };

    dispatch(listProduct({ page: 1, orderView: -1, limit: 5 }));
    dispatch(dashboardSummary());
    dispatch(dashboardCustomer());
    dispatch(dashboardOrder(params));
    dispatch(dashboardOrderMoney(params1));
    dispatch(listProductSell({ page: 1, orderSell: -1, limit: 5 }));
  }, [dispatch]);

  const refreshData = () => {
    const params = {
      startDate: from ? from.toISOString() : "",
      endDate: moment(to).startOf("day").toISOString(),
    };
    dispatch(dashboardOrder(params));
  };

  const refreshData1 = () => {
    const params = {
      startDate: from1 ? from1.toISOString() : "",
      endDate: moment(to1).startOf("day").toISOString(),
    };
    dispatch(dashboardOrderMoney(params));
  };

  useEffect(() => {
    refreshData();
  }, [from, to]);

  useEffect(() => {
    refreshData1();
  }, [from1, to1]);

  const labels = state.dashboard?.orders?.map((e) => e.date);
  const labels1 = state.dashboard?.orderMoneys?.map((e) => e.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Chờ xác nhận",
        data: state.dashboard?.orders?.map((e) => e?.count?.WAITING_CONFIRM),
        borderColor: "#f1c40f",
        backgroundColor: "#f1c40f",
      },
      {
        label: "Đã xác nhận",
        data: state.dashboard?.orders?.map((e) => e?.count?.CONFIRMED),
        borderColor: "#3498db",
        backgroundColor: "#3498db",
      },
      {
        label: "Đang giao hàng",
        data: state.dashboard?.orders?.map((e) => e?.count?.SHIPPING),
        borderColor: "#f39c12",
        backgroundColor: "#f39c12",
      },
      {
        label: "Đã nhận",
        data: state.dashboard?.orders?.map((e) => e?.count?.RECEIVED),
        borderColor: "#8e44ad",
        backgroundColor: "#8e44ad",
      },
      {
        label: "Hoàn thành",
        data: state.dashboard?.orders?.map((e) => e?.count?.SUCCESS),
        borderColor: "#2ecc71",
        backgroundColor: "#2ecc71",
      },
      {
        label: "Đã huỷ",
        data: state.dashboard?.orders?.map((e) => e?.count?.REJECT),
        borderColor: "#e74c3c",
        backgroundColor: "#e74c3c",
      },
    ],
  };

  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "Thu nhập",
        data: state.dashboard?.orderMoneys?.map((e) => e?.count?.SUCCESS),
        borderColor: "#2ecc71",
        backgroundColor: "#2ecc71",
      },
    ],
  };

  const columns2 = [
    {
      title: "ID",
      dataIndex: "user_id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số tiền đã chi",
      dataIndex: "money",
      render: (record) => formatMoney(+record),
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (record) => record.name,
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
    },
  ];
  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (record) => record.name,
    },
    {
      title: "Lượt mua",
      dataIndex: "sell",
    },
  ];

  const handleChangeDate = (start, end) => {
    setFrom(start);
    setTo(end);
  };

  const handleChangeDate1 = (start, end) => {
    setFrom1(start);
    setTo1(end);
  };

  return (
    <MainLayout>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={24}>
            <h2>Tổng quan</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số khách hàng"
                value={state.dashboard?.summary?.countUser}
                valueStyle={{ color: "#3f8600" }}
                suffix="khách hàng"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số đơn hàng hoàn thành"
                value={state.dashboard?.summary?.countOrder}
                valueStyle={{ color: "#3498db" }}
                suffix="đơn"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Sản phẩm tồn kho"
                value={state.dashboard?.summary?.stockQuantity}
                valueStyle={{ color: "#e74c3c" }}
                suffix="sản phẩm"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng thu nhập"
                value={formatMoney(+state.dashboard?.summary?.sumMoney || 0)}
                valueStyle={{ color: "#e74c3c" }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <h2>Thống kê trạng thái đơn hàng</h2>
            <Line options={options} data={data} />
            <DateSelection handleChange={handleChangeDate} />
          </Col>
          <Col span={12}>
            <h2>Thống kê thu nhập</h2>
            <Line options={options1} data={data1} />
            <DateSelection handleChange={handleChangeDate1} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <h2>Sản phẩm xem nhiều</h2>
            <Table
              columns={columns}
              dataSource={state.product.items}
              pagination={false}
            />
          </Col>
          <Col span={12}>
            <h2>Sản phẩm bán chạy</h2>
            <Table
              columns={columns1}
              dataSource={state.product.productSells}
              pagination={false}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={24}>
            <h2>Khách hàng tiềm năng</h2>
            <Table
              columns={columns2}
              dataSource={state.dashboard?.customers}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
