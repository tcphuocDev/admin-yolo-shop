import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import MainLayout from "../../containers/MainLayout";
import { useDispatch, useSelector } from "react-redux";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

export default function Setting() {
  const [form] = Form.useForm();
  const state = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      title: state.item?.title,
      description: state.item?.description,
      keyword: state.item?.keyword,
    });
  }, [form, state]);

  const onFinish = (values) => {
    console.log("values", values);
    dispatch(updateSetting(values, () => dispatch(detailSetting())));
  };

  return (
    <MainLayout>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Cài đặt thông tin website
      </h2>

      <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="keyword" label="Từ khoá" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
}
