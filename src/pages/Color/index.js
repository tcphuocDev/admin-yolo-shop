import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Pagination,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  deleteColor,
  detailColor,
  listColor,
  updateColor,
} from "../../redux/actions/color.action";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Color() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.color);
  console.log("state", state);
  useEffect(() => {
    dispatch(listColor({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên màu",
      dataIndex: "name",
    },
    {
      title: "Mã màu",
      dataIndex: "code",
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <Popconfirm
              title="Bạn có muốn xoá bản ghi này?"
              onConfirm={() =>
                dispatch(
                  deleteColor(item.id, () => dispatch(listColor({ page })))
                )
              }
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                style={{
                  cursor: "pointer",
                  paddingRight: 10,
                }}
              />
            </Popconfirm>
            <EditOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => showModalUpdate(item.id)}
            />
          </>
        );
      },
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };
  console.log(state);
  useEffect(() => {
    form.setFieldsValue({
      name: state?.item?.name,
      code: state?.item?.code,
    });
  }, [form, state.item]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailColor(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới màu sắc";
      case "UPDATE":
        return "Cập nhật màu sắc";
      default:
        break;
    }
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới";
      case "UPDATE":
        return "Cập nhật";
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(createColor(values, () => dispatch(listColor({ page }))));
        break;
      case "UPDATE":
        dispatch(updateColor(id, values, () => dispatch(listColor({ page }))));
        break;
      default:
        break;
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
      <h2>Danh sách màu sắc</h2>
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      <Modal
        title={showTitle(mode)}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên màu sắc"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên màu sắc" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã màu sắc"
            name="code"
            rules={[{ required: true, message: "Vui lòng mã màu sắc" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={state?.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state.meta?.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
