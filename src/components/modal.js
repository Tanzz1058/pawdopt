import React, { useState } from "react";
import { Modal, Button } from "antd";

const Modals = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Modal
        title=""
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p>{props.body}</p>
      </Modal>
    </>
  );
};

export default Modals;
