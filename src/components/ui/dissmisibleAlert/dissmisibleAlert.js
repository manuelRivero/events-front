import React, { useContext } from "react";
import { InterfaceContext } from "./../../../context/interfaceContext";

import { Alert } from "antd";

export default function DissmisibleAlert() {
  const { mainContextAlert, ondismissMainAlert } = useContext(InterfaceContext);
  const closeHandler = () => {
    ondismissMainAlert();
  };

  return mainContextAlert ? (
    <Alert style={{marginBottom:"20px"}}
      message="Error"
      description={mainContextAlert}
      type="error"
      showIcon
      closable
      afterClose={closeHandler}
    />
  ) : null;
}
