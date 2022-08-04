import { Button, Result } from "antd";
import React from "react";

export default function NotAuthorized() {
  return (
    <Result
      status="403"
      title="403 NOT AUTHORIZED"
      subTitle="Bạn không có quyền truy cập vào trang này."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
