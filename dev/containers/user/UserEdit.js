import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, Button, Message,Select,Upload,Icon,Modal,Col,Row,Radio,InputNumber} from 'antd';
// import { Col } from '../../../node_modules/_antd@2.12.5@antd/lib/grid';
// import { Row } from '../../../node_modules/_antd@2.12.5@antd/lib/grid';
// import {saveInfo} from '../../actions/task/tast';
// import {queryNoMysqlDataSource,saveInfo} from '../../actions/ShConfigAction';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class UserEdit extends Component {
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
                    id="name"
                    label="用户名"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('name', {
                        // initialValue : this.state.regNamespace,
                        rules: [{
                            required: true, message: 'Please input your name!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." />
                    )}
                </FormItem>
                
                <FormItem
                    id="nickName"
                    label="平台昵称"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('nickName', {
                        initialValue : this.state.regNamespace,
                        rules: [{
                            required: true, message: 'Please input your nickName!',
                            max: 32,
                        }],
                    })(
                        <Input id="control-input" placeholder="Please enter..." />
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

                <FormItem
                    id="userSign"
                    label="平台签名"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('userSign', {
                        // initialValue : this.state.regId,
                        required: true, message: '请输入正确平台签名!',
                        max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..."  />
                    )}
                </FormItem>
                <FormItem
                    id="userMobile"
                    label="用户手机号码"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('userMobile', {
                        // initialValue : this.state.regServerList,
                        required: true, message: '请输入正确用户手机号码!',
                        max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..."  />
                    )}
                </FormItem>
               
                <FormItem
                    id="userType"
                    label="用户类型"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('userType', {
                        initialValue : `1`,
                        // required: true, message: '请输入正确创建人!',
                        // max: 32,
                    })(
                        <RadioGroup>
                            <Radio value={`1`}>游客</Radio>
                            <Radio value={`2`}>验证客户</Radio>
                            <Radio value={`3`}>付费会员</Radio>
                         </RadioGroup>

                        // <Select>
                        //     <Select.Option value={`1`}>游客</Select.Option>
                        //     <Select.Option value={`2`}>验证客户</Select.Option>
                        //     <Select.Option value={`3`}>付费会员</Select.Option>
                        // </Select>
                    )}
                </FormItem>

                <FormItem
                    id="wcUserName"
                    label="微信账号"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('wcUserName', {
                        // initialValue :this.state.username,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                <FormItem
                    id="wcNickName"
                    label="微信名"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('wcNickName', {
                        // initialValue :this.state.username,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="status"
                    label="用户状态"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('status', {
                        initialValue :`0`,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <RadioGroup>
                            <Radio value={`0`}>正常</Radio>
                            <Radio value={`1`}>删除</Radio>
                            <Radio value={`2`}>冻结</Radio>
                            <Radio value={`3`}>禁言</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                
                <FormItem
                    id="aliUserName"
                    label="支付宝账号"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('aliUserName', {
                        // initialValue :this.state.username,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>
                
                <FormItem
                    id="aliNickName"
                    label="支付宝昵称"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('aliNickName', {
                        // initialValue :this.state.username,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <Input id="control-input" placeholder="Please enter..." disabled/>
                    )}
                </FormItem>

                <FormItem
                    id="vipLevel"
                    label="vip等级"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('vipLevel', {
                        // initialValue :this.state.username,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <InputNumber/>
                    )}
                </FormItem>

                <FormItem
                    id="cyScoreCount"
                    label="累计积分"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cyScoreCount', {
                        initialValue :0,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <InputNumber/>
                    )}
                </FormItem>

                <FormItem
                    id="cyScoreBalance"
                    label="累计积分"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cyScoreBalance', {
                        initialValue :0,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <InputNumber/>
                    )}
                </FormItem>

                <FormItem
                    id="balance"
                    label="余额"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('balance', {
                        initialValue :0,
                        // required: true, message: '请输入正确修改人!',
                        // max: 32,
                    })(
                        <InputNumber/>
                    )}
                </FormItem>

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

const UserEditInfo = Form.create()(UserEdit);
export default connect((state) => {
    return {
        // noMysqlDataSourceList: state.shConfigReducer.noMysqlDataSourceList
    };
}, {
    // queryNoMysqlDataSource,
    // saveInfo
})(UserEditInfo);