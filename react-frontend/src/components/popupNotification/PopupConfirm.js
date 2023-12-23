import React from 'react';


import { Popconfirm, } from 'antd';

const PopupConfirm = ({title, description, confirm, cancel, component}) => (
  <Popconfirm
    placement="topLeft"
    title={title}
    description={description}
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    okType="primary"
    ghost
    cancelText="No"
  >
    {component}
  </Popconfirm>
);
export default PopupConfirm;