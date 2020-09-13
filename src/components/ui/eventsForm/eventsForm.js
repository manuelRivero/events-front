import React from 'react';
import { Form, Input, DatePicker } from 'antd';



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

export default function EventsForm(props) {
    const [form] = Form.useForm();


    const fieldsChangeHandler = (e) =>{
        console.log(form.getFieldsValue())
        console.log(form.validateFields())
        // const {value, name}=target;
        // console.log(value +"" +name)
    }
    return (
        <Form {...layout} form={form} name="eventsForm" >
          <Form.Item name={['name']} label="Event name" rules={[{ required: true }]} onChange={fieldsChangeHandler}>
            <Input />
          </Form.Item>
          <Form.Item name={'price'} label="Price" rules={[{ required: true }]} onChange={fieldsChangeHandler}>
            <Input />
          </Form.Item>
          <Form.Item name={'date'} label="date" rules={[{ required: true, type: 'object' }]} onChange={fieldsChangeHandler}>
          <DatePicker  />
          </Form.Item>
          <Form.Item name={'descrition'} label="Descrition" onChange={fieldsChangeHandler}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      );
}
