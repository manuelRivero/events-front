import React, {useState} from 'react';
import { PageHeader, Button, Descriptions } from 'antd';
import Modal from './../../components/ui/modal/modal'


const Events = () => {
    const [showModal, setShowModal] = useState(false)

    const showModalHandler = () => {
        setShowModal(true);
    }
    const hideModalHandler = () => {
        setShowModal(false);
    }
    const submitEvent = () => {
        console.log("ok")
    }
    return (
        
  <div className="site-page-header-ghost-wrapper">
      <Modal show={showModal} onOk={submitEvent} onCancel={hideModalHandler}>
          <p>hola</p>
      </Modal>
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