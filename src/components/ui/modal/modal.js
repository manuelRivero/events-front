import React, {useState} from 'react';
import { Modal, Button } from 'antd';


export default function _Modal({show, onOk, onCancel, children}) {

   
    return ( 
        
            <div>
              <Modal
                title="Basic Modal"
                visible={show}
                onOk={onOk}
                onCancel={onCancel}
              >
                  {children}
              </Modal>
            </div>
        
    )
}
