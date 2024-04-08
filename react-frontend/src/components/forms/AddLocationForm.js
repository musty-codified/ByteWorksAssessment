import {useState } from 'react';
import { Input, Col, Form, Row, Spin, } from 'antd';
import {useAuth} from '../../context/AuthContext'
import {
    LoadingOutlined
} from '@ant-design/icons';
  
const rowGutterSize = 10
const spanSize = 10;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AddLocationForm = ({ setShowDrawer }) => {
    const [ form ] = Form.useForm() 
    const[submitting, setSubmitting] = useState(false);
    const {headerTitle, addLocationConfig, updateLocationConfig} = useAuth()

    const onClose = () => setShowDrawer(false);

       const onFinish = location => {
         setSubmitting(true);
         const newLocation = { ...location }
         console.log("location object: " + JSON.stringify(newLocation, null, 2))
         console.log("location object: " + JSON.stringify(newLocation, null, 2))

        if(headerTitle === "Add New Location")
        
        addLocationConfig(setSubmitting, onClose, newLocation)

        else
        updateLocationConfig(onClose, newLocation)
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2))
    };

    
  return (
    <section className="form-section">
    <Form layout="vertical"
            form={form}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}>
        <Row gutter={rowGutterSize}>
            <Col span={spanSize}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true, message: 'Location name required'}]}
                >
                    <Input placeholder="Name"/>
                </Form.Item>
            </Col>
        </Row>
    
        <Row gutter={rowGutterSize}>
            <Col span={spanSize}>
                <Form.Item
                    name="latitude"
                    label="Latitude in degree"
                    rules={[{required: true, message: 'Please enter Latitude'}]}
                >
                    <Input placeholder="Latitude"/>
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={rowGutterSize}>
            <Col span={spanSize}>
                <Form.Item
                    name="longitude"
                    label="Longitude in degree"
                    rules={[{required: true, message: 'Please enter Longitude'}]}
                >
                    <Input placeholder="Longitude" type="number"/>
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={rowGutterSize}>
            <Col span={spanSize}>
                <Form.Item
                    name="clearingCost"
                    label="Clearing cost in $"
                    rules={[{required: true, message: 'Please enter cost of clearing the package'}]}
                >
                    <Input placeholder="Clearing Cost"/>
                </Form.Item>
            </Col>
        </Row>

        <Row>
            <Col span={spanSize}>
                <Form.Item >
                    <button className="primary home-btn" type="submit" style={{margin: "auto"}}>Submit</button>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            { submitting && <Spin indicator={antIcon}/> }
        </Row>
    </Form>

    </section>
  )
}

export default AddLocationForm