import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, Button, Message,Select,Upload,Icon,Modal,Col,Row,Radio,InputNumber} from 'antd';
// import { Col } from '../../../node_modules/_antd@2.12.5@antd/lib/grid';
// import { Row } from '../../../node_modules/_antd@2.12.5@antd/lib/grid';
// import {saveInfo} from '../../actions/task/tast';
// import {queryNoMysqlDataSource,saveInfo} from '../../actions/ShConfigAction';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            // username : window.localStorage.getItem("username"),
            // id:this.props.location.state.id,
            // regNamespace:this.props.location.state.regNamespace,
            // regId:this.props.location.state.regId,
            // regServerList:this.props.location.state.regServerList,
            // dataSourceName:this.props.location.state.dataSourceName,
            // createBy:this.props.location.state.createBy,
            // updateBy:this.props.location.state.updateBy,
            // update:this.props.location.state.update,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              }],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // const {saveInfo} = this.props;
                // saveInfo(values);
            }
        });
    }
   

    //头像上传
    handleCancel(){
        this.setState(
            { previewVisible: false }
        )
    }
    
      handlePreview (file) {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
      handleChange({ fileList }){
        this.setState({ fileList })
      }


    componentWillMount() {
       
    }

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    id="id"
                    label="ID"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('id', {
                        // initialValue : this.state.id
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                
                <FormItem
                    id="nickName"
                    label="平台昵称"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('nickName', {
                        initialValue : this.state.nickName,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="createdTime"
                    label="注册时间"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('createdTime', {
                        // initialValue : this.state.createdTime,
                        rules: [{
                            max: 32,
                        }],
                    })(
                        <span className="ant-form-text">{moment(this.state.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                    )}
                </FormItem>

                <FormItem
                    id="inviteName"
                    label="邀请人昵称"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('inviteName', {
                        // initialValue : this.state.inviteName,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="userSign"
                    label="自我描述"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('userSign', {
                        initialValue : this.state.userSign,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                <FormItem
                    id="wcUserName"
                    label="微信账号"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('wcUserName', {
                        initialValue : this.state.wcUserName,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="status"
                    label="用户类型"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('status', {
                        initialValue : this.state.status,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="name"
                    label="真实姓名"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('name', {
                        initialValue : this.state.name,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                <FormItem
                    id="cid"
                    label="身份证"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cid', {
                        initialValue : this.state.cid,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                <FormItem
                    id="cid"
                    label="身份证"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cid', {
                        initialValue : this.state.cid,
                        rules: [{
                            // required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="平台头像"
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        // <div>
                        <Col>
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                >
                            {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Col>
                        // </div>
                        // <Upload
                        // action="//jsonplaceholder.typicode.com/posts/"
                        // listType="picture-card"
                        // fileList={fileList}
                        // onPreview={this.handlePreview}
                        // onChange={this.handleChange}
                        // >
                        // {fileList.length >= 3 ? null : uploadButton}
                        // </Upload>
                        // <Row gutter={10}>
                        //      <Col span={6}>
                        //      <span>username:</span>
                        //     </Col>
                        //     <Col span={6}>
                        //         <span>username:</span>
                        //     </Col>
                        // </Row>
                    )}
                    </FormItem> */}


                <FormItem wrapperCol={{
                    xs: {span: 24, offset: 0},
                    sm: {span: 16, offset: 8},
                }} style={{marginTop: 24}}>
                    <Button type="primary" htmlType="submit">确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="ghost" onClick={() => browserHistory.goBack()}>返回</Button>
                </FormItem>
            </Form>
        );
    }
}

const VerifyInfo = Form.create()(Verify);
export default connect((state) => {
    return {
        // noMysqlDataSourceList: state.shConfigReducer.noMysqlDataSourceList
    };
}, {
    // queryNoMysqlDataSource,
    // saveInfo
})(VerifyInfo);