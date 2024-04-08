import React, { useContext, useEffect, useState} from 'react'
import { dataContext } from '../context/AuthContext';
// import ReactPaginate from 'react-paginate';
import { Breadcrumb, Layout, Menu, Table, Tag, Badge, theme } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined
} 

from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Location', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const columns = [
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
    key: 'clearing cost',
  },
];

const LocationView = () => {

  const {viewLocations, getLocations, pageElementSize, 
    pageNumber, totalElements, numOfElements, setLocationsUrl} = useContext(dataContext)

  // console.log(locations)

  const [collapsed, setCollapsed] = useState(false);
  // const [fetching, setFetching] = useState(true);


  const activeStyles = {
    color: "springgreen"
    }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(()=>{
    getLocations()

  //  eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   console.log(viewLocations)

  return (  
      <div>

<Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} 
        onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Location</Breadcrumb.Item>
            <Breadcrumb.Item>Route</Breadcrumb.Item>
           </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

                {/* if (fetching) {
                  return <Spin indicator={antIcon}/>
                } */}

        <Table 
        dataSource={viewLocations.map((elem)=>({
             key: elem.id,
             name: elem.name,
             latitude: elem.latitude,
             longitude: elem.longitude,
             clearingCost: elem.clearingCost
                }
                                              
               ))} columns={columns} 
               
               bordered
               title={() => 
                <>
                LOCATIONS
                <Tag style={{marginLeft: "15px"}}>Number of Locations</Tag>
                <Badge
                     style={activeStyles}
                     count={totalElements}
                 />

                </>
                    }
               pagination={{ pageSize: 10 }} scroll={{ y: 240 }}
               rowKey={(elem)=>elem.id}
               
               />;

          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>          
          </div>
        
    )
  }
  
export default LocationView


