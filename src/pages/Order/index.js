import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Modal,
  Table,
  Form,
  Pagination,
  Popconfirm,
  Row,
  Col,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckSquareOutlined,
  EyeOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { formatTime, formatMoney } from "../../common/common";
import {
  changeStatusOrder,
  detailOrder,
  listOrder,
} from "../../redux/actions/order.action";
import { OrderStatus, OrderStatusEnum } from "./order-status.const";
import { useReactToPrint } from "react-to-print";

export default function Order() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(listOrder({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Người mua",
      dataIndex: "user",
      render: (record) => record.fullname,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (record) => OrderStatus[record],
    },
    {
      title: "Tổng giá trị",
      render: (record) => {
        const totalMoney = record.orderDetails.reduce((total, item) => {
          return (
            total +
            (item?.orderPrice || item?.salePrice || item?.price) * item.quantity
          );
        }, 0);
        return formatMoney(
          (totalMoney * (100 - record.coupon.value || 0)) / 100
        );
      },
    },
    {
      title: "Tổng số lượng",
      render: (record) =>
        `${record.orderDetails.reduce((total, item) => {
          return total + item.quantity;
        }, 0)} sản phẩm`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (record) => formatTime(record),
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <EyeOutlined
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
              onClick={() => showModalDetail(item?.id)}
            />
            {item.status !== OrderStatusEnum.SUCCESS &&
            item.status !== OrderStatusEnum.REJECT ? (
              <Popconfirm
                title="Bạn có muốn thay đổi trạng thái?"
                onConfirm={() => handleChangeStatus(item, false)}
                okText="Có"
                cancelText="Không"
              >
                <CheckSquareOutlined
                  style={{
                    cursor: "pointer",
                    paddingRight: 10,
                  }}
                />
              </Popconfirm>
            ) : (
              <></>
            )}
            {[
              OrderStatusEnum.WAITING_CONFIRM,
              OrderStatusEnum.CONFIRMED,
              OrderStatusEnum.SHIPPING,
            ].includes(item.status) ? (
              <Popconfirm
                title="Bạn có muốn huỷ đơn hàng?"
                onConfirm={() => handleChangeStatus(item, true)}
                okText="Có"
                cancelText="Không"
              >
                <MinusCircleOutlined
                  style={{
                    cursor: "pointer",
                    paddingRight: 10,
                  }}
                />
              </Popconfirm>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];

  const columnsDetail = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productId",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Phiên bản",

      render: (record) => `${record.color?.name} - ${record.storage?.name}`,
    },
    {
      title: "Giá",

      render: (record) =>
        formatMoney(record.orderPrice || record.salePrice || record.price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Thành tiền",

      render: (record) =>
        formatMoney(
          (record.orderPrice || record.salePrice || record.price) *
            record.quantity
        ),
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  const showModalDetail = (id) => {
    setVisible(true);
    dispatch(detailOrder(id));
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleChangeStatus = (item, isReject) => {
    let status;
    if (!isReject) {
      switch (item.status) {
        case OrderStatusEnum.WAITING_CONFIRM:
          status = OrderStatusEnum.CONFIRMED;
          break;
        case OrderStatusEnum.CONFIRMED:
          status = OrderStatusEnum.SHIPPING;
          break;
        case OrderStatusEnum.SHIPPING:
          status = OrderStatusEnum.RECEIVED;
          break;
        case OrderStatusEnum.RECEIVED:
          status = OrderStatusEnum.SUCCESS;
          break;
        default:
          break;
      }
    } else {
      status = OrderStatusEnum.REJECT;
    }

    dispatch(
      changeStatusOrder(item.id, { status }, () =>
        dispatch(listOrder({ page }))
      )
    );
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  return (
    <MainLayout>
      <h2>Danh sách đơn hàng</h2>
      <Table
        columns={columns}
        dataSource={state.order.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.order.meta.total}
        onChange={onChange}
      />

      <Modal
        title="Chi tiết đơn hàng"
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
      >
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={24} style={{ float: "right" }}>
              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" onClick={handlePrint}>
                  In hoá đơn
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <div
            ref={componentRef}
            style={{
              padding: 20,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Cửa hàng"
                  name="categoryId"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <b>cellPhoneS</b>
                </Form.Item>
                <Form.Item
                  label="Mã đơn hàng"
                  name="categoryId"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  #{state.order.item?.id}
                </Form.Item>
                <Form.Item
                  label="Trạng thái đơn hàng"
                  name="categoryId"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {OrderStatus[state.order.item?.status]}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Người mua"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.user?.fullname}
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.phone}
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.address}
                </Form.Item>
              </Col>
              <Col span={24}>
                <h3>Danh sách sản phẩm</h3>
                <Table
                  columns={columnsDetail}
                  dataSource={state.order.item.orderDetails}
                  pagination={false}
                />
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Form.Item
                  label="Tổng số tiền"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {formatMoney(
                    state.order.item?.orderDetails?.reduce((total, item) => {
                      return (
                        total +
                        (item?.orderPrice || item?.salePrice || item?.price) *
                          item.quantity
                      );
                    }, 0)
                  )}
                </Form.Item>
                <Form.Item
                  label="Mã giảm giá"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {state.order.item?.coupon?.id
                    ? `${state.order.item?.coupon?.code} - Giảm ${state.order.item?.coupon?.value}%`
                    : "Không"}
                </Form.Item>
                <Form.Item
                  label="Thanh toán"
                  name="name"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  {formatMoney(
                    (state.order.item?.orderDetails?.reduce((total, item) => {
                      return (
                        total +
                        (item?.orderPrice || item?.salePrice || item?.price) *
                          item.quantity
                      );
                    }, 0) *
                      (100 - state.order.item?.coupon?.value || 0)) /
                      100
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </MainLayout>
  );
}
