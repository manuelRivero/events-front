import React, {useContext} from 'react';
import {InterfaceContex} from './../../../context/interfaceContext';

import { Alert } from 'antd';


export default function DissmisibleAlert() {
    const {mainContextAlert, ondismissMainAlert } = useContext(InterfaceContex);
    const closeHandler = ()=>{
        ondismissMainAlert()
    }
    return (
        <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
        closable
        afterClose ={closeHandler}
      />
    )
}
