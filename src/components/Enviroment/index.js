import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { detailSetting } from "../../redux/actions/setting.action";

export default function Enviroment({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailSetting());
  }, [dispatch]);

  return <>{children}</>;
}
