import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, Button, Message,Select,Upload,Icon,Modal,Col,Row,Radio,InputNumber} from 'antd';
import {VerifyInfo,getLable,updateVerifyInfo} from '../../actions/UserAction';
import user from '../../reducers/user';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var baserUrl=`http://zone-admin.test.upcdn.net`
var initValue=0;
class UserEdit extends Component {
    constructor(props) {
        initValue=0;
        super(props);
        this.state = {
            id:this.props.location.state.id,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateVerifyInfo = this.updateVerifyInfo.bind(this);
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {updateVerifyInfo} = this.props;
                var data={
                    id:this.props.form.getFieldValue(`id`),
                    lableIdList:this.props.form.getFieldValue(`lableId`),
                    status:`3`
                }
                updateVerifyInfo(data);
            }
        });
    }
   
    updateVerifyInfo() {
        var lableId =  this.props.form.getFieldValue(`lableId`);
        const {updateVerifyInfo} = this.props;
        var data={
            id:this.props.form.getFieldValue(`id`),
            lableIdList:this.props.form.getFieldValue(`lableId`),
            status:`1`
        }
        updateVerifyInfo(data);
    }

    componentWillMount() {
        const {VerifyInfo} = this.props;
        VerifyInfo(this.state.id);

        const {getLable} = this.props;
        getLable();
        
    }

    render() {
        initValue++;
        const {verifyInfoValue} = this.props;
        const userInfo = verifyInfoValue.user
        var str = userInfo.lableId;
        var labelidValue=[];
        if(str !=undefined){
            var strList=str.split(`,`);
            for (let i = 0; i < strList.length; i++) {
                labelidValue.push(strList[i].toString());
            }
        }

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        //标签
        const {getLableCount} = this.props;
        var lableList = getLableCount.list;
        var children = [];
        for (let i = 0; i < lableList.length; i++) {
            children.push(<Select.Option key={lableList[i].id.toString()}>{lableList[i].labelName}</Select.Option>);
        }
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    id="id"
                    label="ID"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('id', {
                         initialValue:userInfo.id,
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
                    })(
                        <span>{userInfo.nickName}</span>
                    )}
                </FormItem>

                <FormItem
                    id="createdTime"
                    label="注册时间"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('createdTime', {
                      
                    })(
                        <span className="ant-form-text">{moment(userInfo.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                    )}
                </FormItem>

                <FormItem
                    id="inviteName"
                    label="邀请人昵称"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('inviteName', {
                    })(
                        <span>{userInfo.inviteNickName}</span>
                    )}
                </FormItem>

                <FormItem
                    id="userSign"
                    label="自我描述"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('userSign', {
                    })(
                        <span>{userInfo.userSign}</span>
                    )}
                </FormItem>
                <FormItem
                    id="wcUserName"
                    label="微信账号"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('wcUserName', {
                    })(
                        <span>{userInfo.wcUserName}</span>
                    )}
                </FormItem>

                <FormItem
                    id="statusValue"
                    label="用户类型"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('statusValue', {
                    })(
                        <span>{userInfo.statusValue}</span>
                    )}
                </FormItem>

                <FormItem
                    id="name"
                    label="真实姓名"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('name', {
                    })(
                        <span>{userInfo.name}</span>
                    )}
                </FormItem>
                <FormItem
                    id="cid"
                    label="身份证号"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cid', {
                    })(
                        <span>{userInfo.cid}</span>
                    )}
                </FormItem>
                <FormItem
                    id="cidUrl"
                    label="身份证照片"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('cidUrl', {
                    })(
                        <img src={baserUrl+userInfo.cidUrl} style={{ width: '50%' }}/>
                    )}
                </FormItem>
                
                <FormItem
                    id="lableId"
                    label="标签(多选)"
                    {...formItemLayout}
                    required>
                    {getFieldDecorator('lableId', {
                        initialValue:labelidValue,
                    })(
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        // defaultValue={['a10', 'c12']}
                    >
                      {children}
                    </Select>
                    )}
                </FormItem>

                <FormItem wrapperCol={{
                    xs: {span: 24, offset: 0},
                    sm: {span: 16, offset: 8},
                }} style={{marginTop: 24}}>
                    <Button type="ghost" onClick={() => browserHistory.goBack()}>返回</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" htmlType="submit">保存并通过</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="danger" onClick={this.updateVerifyInfo}>拒绝</Button>
                </FormItem>
            </Form>
        );
    }
}

const UserEditPage = Form.create()(UserEdit);

export default connect((state) => {
    return {
        verifyInfoValue: state.userReducer.verifyInfo,
        getLableCount : state.userReducer.cyLableCount,
    };
}, {
    VerifyInfo,
    getLable,
    updateVerifyInfo
})(UserEditPage);