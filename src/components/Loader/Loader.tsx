import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import React from "react";

const SpinLoader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <Spin indicator={antIcon} />
  );
};

export default SpinLoader;