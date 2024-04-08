
import { Button, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useAuth } from "../../context/AuthContext";
import PopupConfirm from '../popupNotification/PopupConfirm'

const HandleAddLocationDetails=({location, setShowDrawer})=>{

    const { getLocations, deleteLocationConfig, setSingleLocation, setHeaderTitle } = useAuth()

 return(

    <div>

        <PopupConfirm 
        description={`Delete ${location.name.toUpperCase()}?`} 
        confirm={() => confirmDeleteLocation(location, deleteLocationConfig, getLocations)} 
        cancel={() => cancelDeleteLocation(location)}
        component={ <Button type="primary default" 
        danger ghost icon={<DeleteOutlined />}></Button> }
        />


    <PopupConfirm 
     description={`Do you want to edit location ${location.name}?`} 
        confirm={() => confirmEditLocation(location, setShowDrawer, setSingleLocation, setHeaderTitle)}
        cancel={() => cancelEditLocation(setShowDrawer)}
        component={ <Button type="primary danger" 
        ghost icon={<EditOutlined />}></Button> }/>

    </div>
)

}

const confirmDeleteLocation = (location, removeLocation, getLocations) => {
    removeLocation(location)
    getLocations()
  }


  const cancelDeleteLocation = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const confirmEditLocation = (location, setShowDrawer, setSingleLocation, setHeaderTitle) => {
    setHeaderTitle(`Update Location: ${location.name}`)
    setSingleLocation(location)
    setShowDrawer(true)
    message.success('Click on Yes');
  };

  
  const cancelEditLocation = (setShowDrawer) => {
    setShowDrawer(false)
    message.error('Click on No');
  };

    
  const locationColumns =(setShowDrawer)=> [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Latitude',
        dataIndex: 'latitude',
        key: 'latitude',
    },
    {
        title: 'Longitude',
        dataIndex: 'longitude',
        key: 'longitude',
    },
    {
        title: 'Clearing Cost',
        dataIndex: 'clearing cost',
        key: 'clearingCost',
    },

    {
        title: "Actions",
        dataIndex: 'actions',
        key: 'actions',
        render: (_, location) => <HandleAddLocationDetails key={location.id}
        location={location} setShowDrawer={setShowDrawer}/>
    },
];

export {locationColumns}
