import { Button, Result } from "antd";
import React from "react";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404 NOT FOUND"
      subTitle="Trang bạn yêu cầu không tồn tại."
      extra={<Button type="primary">Trang chủ</Button>}
    />
  );
}
