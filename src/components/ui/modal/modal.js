import React from "react";
import moment from 'moment';

import { Modal, Form, Input, DatePicker, InputNumber } from "antd";


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };


export default function _Modal({ show, onOk, onCancel}) {
    const [form] = Form.useForm();

    const checkForm = () => {
        form.validateFields().then( form =>{
            console.log(form.date)
            onOk({...form, date: form.date._i})
        }).catch( err => err)
    }

    const cancelHanler = () => {
        form.resetFields();
        onCancel();
    }

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={show}
        onOk={checkForm}
        onCancel={cancelHanler}
      >
        <Form {...layout} form={form} name="eventsForm">
          <Form.Item
            name={"name"}
            label="Event name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"price"}
            label="Price"
            rules={[{ required: true, type:'number' }]}
          >
            <InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
          </Form.Item>
          <Form.Item
            name={"date"}
            label="date"
            rules={[{ required: true, type: "object" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={"descrition"}
            label="Descrition"
            rules={[{ required: true, min:10 }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
