import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import { Table, Pagination, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../common/common";
import { UserStatus } from "./user-status.const";
import { listUser, updateUser } from "../../redux/actions/user.action";

export default function User() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(listUser({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (record) => UserStatus[record],
    },
    {
      title: "Quyền",
      dataIndex: "role",
      render: (record, row) => (
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="User"
          checked={+record === 1 ? true : false}
          onChange={(checked) => {
            dispatch(
              updateUser(row.id, { role: checked ? 1 : 0 }, () =>
                dispatch(listUser({ page }))
              )
            );
          }}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",

      render: (record, row) => (
        <Switch
          checkedChildren="Hoạt động"
          unCheckedChildren="Bị khoá"
          checked={+record === 1 ? true : false}
          onChange={(checked) => {
            dispatch(
              updateUser(row.id, { isActive: checked ? 1 : 0 }, () =>
                dispatch(listUser({ page }))
              )
            );
          }}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",

      render: (record) => formatTime(record),
    },
  ];

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <MainLayout>
      <h2>Danh sách người dùng</h2>
      <Table columns={columns} dataSource={state?.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10 }}
        current={page}
        total={state?.meta?.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
