import React, {useState, useContext} from 'react';
import { PageHeader, Button, Descriptions } from 'antd';
import {AuthContext} from './../../context/authContext'
import Modal from './../../components/ui/modal/modal';



const Events = () => {
    const [showModal, setShowModal] = useState(false);
    const {token} = useContext(AuthContext);

    const showModalHandler = () => {
        setShowModal(true);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    const submitEvent = (form) => {
        const {name, price, description, date} = form
        console.log(token)
        let requestBody = {
          query: `
          mutation{
            createEvents(eventInput:{title:"${name}", description:"${description}", price:${price}, date:"${date}"}){
            _id
            title
            description
            date
            price
            creator{
              _id
              email
            }
          }}`,
        };
        
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" +" " + token
        
      },
    })
      .then((res) => {
       
        return res.json();
      })
      .then((res) => {
         console.log(res)
        if (res.errors) {
          throw new Error(res.errors[0]["message"]);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  
    return (
        
  <div className="site-page-header-ghost-wrapper">
      <Modal show={showModal} onOk={submitEvent} onCancel={hideModalHandler} />
  <PageHeader
    ghost={false}
    onBack={() => window.history.back()}
    title="Event management"
    extra={[
      <Button key="3">Operation</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary" onClick={showModalHandler}>
        Create new event
      </Button>,
    ]}
  >
    <Descriptions size="small" column={3}>
      <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
      <Descriptions.Item label="Association">
        <a>421421</a>
      </Descriptions.Item>
      <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
      <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
      <Descriptions.Item label="Remarks">
        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
      </Descriptions.Item>
    </Descriptions>
  </PageHeader>
</div>
    )
}

export default Events;