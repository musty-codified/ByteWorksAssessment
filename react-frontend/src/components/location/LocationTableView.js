import React, { useState} from 'react'
import AddLocationForm from '../forms/AddLocationForm';
import {locationColumns} from './LocationData'
import ReactPaginate from 'react-paginate'
import {useAuth} from '../../context/AuthContext'
import { Table, Spin, Empty, Button, Badge, Tag} from 'antd';
import {
    UserAddOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    LoadingOutlined,
    
} from '@ant-design/icons';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DrawerForm from '../forms/DrawerForm';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const LocationTableView = ({tableTitle}) => {

      const changePage = ({ selected }) => setPageNumber(selected)
      const { viewLocations, totalPages, setPageNumber, fetching, totalElements, 
      setSingleLocation, setHeaderTitle, headerTitle } = useAuth()
              const[showDrawer, setShowDrawer] = useState(false)

      const handleShowDrawer = () => {
        setHeaderTitle("Add New Location")

        setSingleLocation({
                name: "",
                latitude: "",
                longitude: "",
                clearingCost: ""
              })
              
        setShowDrawer(!showDrawer);
      }

  return (
    <section className='location-table-data'>

        <DrawerForm 
            title={headerTitle}
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            formLayout={<AddLocationForm 
            setShowDrawer={ setShowDrawer } 
        />}
      />
        {fetching &&
            <div style={{ width: "100vw", display: "flex", height:"100%", alignItems: "center", justifyContent: "center"}}>
                <Spin indicator={antIcon} style={{ color: "rgb(218, 196, 161)" }}/>
            </div>
          }  

      <div className="table-div">
            {
              viewLocations?.length > 0 &&          

              <div className="title-head">
                  <div className='title-sub-head'>
                    <button className="home-btn" onClick={handleShowDrawer}>
                      <UserAddOutlined />Add New Location
                    </button>
                      <button className="btn-count">{totalElements}</button>
                  </div>
                  <h2 className='"layout-h2-header'>{tableTitle}</h2>
                <ReactPaginate 
                  previousLabel={<CaretLeftOutlined />}
                  nextLabel={<CaretRightOutlined />}
                  pageCount={totalPages} 
                  onPageChange={changePage}
                  containerClassName={"paginationBtns"}
                  previousLinkClassName={"prevBtn"}
                  nextLinkClassName={"nextBtn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div> 
              }

                {viewLocations?.length > 0 && 
               <Table 
                dataSource={viewLocations} 
                columns={locationColumns(setShowDrawer)}  //
                bordered
                title={() => 
                  <>
                <Button 
                onClick={handleShowDrawer}
                type="primary " shape="round" icon={<AddLocationIcon/>} size="small">
                 
                Add New Location

                </Button>
                <Tag style={{marginLeft: "15px"}}>Number of Locations</Tag>
                <Badge
                     className="site-badge-count-109"
                     count={totalElements}
                 />
                </>
                
                }
                
                footer={() => 'Footer'}
                pagination={{ pageSize: 50 }} scroll={{ y: 400 }}
                rowKey={(location)=>location.name}
                
                     />
                }
            </div>

            { viewLocations?.length === 0 && !fetching && 
              <div style={{ width: "100vw", display: "flex", height:"100%", 
              alignItems: "center", justifyContent: "center"}}>

              <Empty> 
                <button className="home-btn" onClick={handleShowDrawer}>
                  Add New Location
                </button>
              </Empty>
            </div>
          }   

    </section>
  )
}

export default LocationTableView