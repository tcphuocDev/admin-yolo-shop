import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getProfile } from "../../redux/actions/auth.action";
import NotAuthorized from "../../components/NotAuthoried";
import { ROLE } from "../../common/common";
import { Spin } from "antd";

export default function PrivateRouter({
  component: Component,
  roles = [ROLE.ADMIN],
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  // useEffect(() => {
  //   dispatch(getProfile(() => setTimeout(() => setIsLoading(false), 0)));
  // }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="Đang tải..."></Spin>
      </div>
    );
  } else {
    // if (
    //   (roles.length && !roles.includes(state?.user?.role)) ||
    //   state?.user?.isActive === 0
    // )
    //   return <NotAuthorized />;
    return <Component {...rest} />;
  }
}
