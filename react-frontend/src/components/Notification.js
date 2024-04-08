import { notification } from "antd";

const [api, contextHolder] = notification.useNotification();

const openNotificationWithIcon = 
(type, 
message, 
description 
) => {

    api[type]({message,description});
  };

  export const successNotification = (message, description)=>
  openNotificationWithIcon('success', message, description)
  export const errorNotification = (message, description)=>
  openNotificationWithIcon('error', message, description)
  export const infoNotification = (message, description)=>
  openNotificationWithIcon('info', message, description)
  export const warningNotification = (message, description)=>
  openNotificationWithIcon('warning', message, description)