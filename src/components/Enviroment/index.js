import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Enviroment({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
  }, [dispatch]);

  return <>{children}</>;
}
