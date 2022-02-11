import React from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";

export default function Spinner(props) {
  let show = true ? <Spin size={props.size} /> : null;
  return <>{show}</>;
}
