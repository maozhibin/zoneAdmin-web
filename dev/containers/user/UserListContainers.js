import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {getData,updateSattus,editInfo,addInfo} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
class UserListContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePage(1, 10);
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: '平台昵称',
            dataIndex: 'nickName',
        }, {
            title: '邀请人昵称',
            dataIndex: 'uidNickName',
        }, {
            title: '用户手机号码',
            dataIndex: 'userMobile',
        }, {
            title: '是否可用',
            dataIndex: 'statusValue',
        }, {
            title: '用户类型',
            dataIndex: 'userTypeValue',
        }, {
            title: '微信昵称',
            dataIndex: 'wcUserName',
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateSattus} = this.props;
                const {editInfo} = this.props;
                return (
                    <span>
                       {/* <Button type="dashed" onClick={() => editInfo(record)}>编辑</Button> */}
                       {
                            record.status != 1 ?
                            <Button type="danger" style={{marginLeft: 8}} onClick={() => updateSattus(record.id,1)}>删除</Button> :
                            <Button type="danger" style={{marginLeft: 8}} disabled>删除</Button>
                        }
                        {
                            record.status != 2 ?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateSattus(record.id,2)}>冻结</Button>:
                            <Button type="dashed" style={{marginLeft: 8}} disabled>冻结</Button>
                        }
                        {
                            record.status != 3 ?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateSattus(record.id,3)}>禁言</Button> :
                            <Button type="dashed" style={{marginLeft: 8}} disabled>禁言</Button>
                        }
                        {
                            record.status != 0?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateSattus(record.id,0)}>正常</Button> :
                            <Button type="dashed" style={{marginLeft: 8}} disabled>正常</Button>
                        }
                  </span>
                );
            },
        }];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize) {
        this.props.getData({pageNo: pageNo, pageSize: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {getData} = this.props;
            const data =JSON.stringify({
                nickName:this.props.form.getFieldValue(`nickName`),
                status:this.props.form.getFieldValue(`status`),
                userType:this.props.form.getFieldValue(`userType`),
            })
            getData(JSON.parse(data));
        });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {userList} = this.props;
        const {searchInfo} = this.props;
        const {addInfo} = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 20 },
          };
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    id="id"
                    {...formItemLayout}
                    required>
                   <Row gutter={20}>
                   <Col span={2}>
                            <span>平台昵称:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`nickName`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>

                    <Col span={2}>
                            <span>是否可用:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`status`, {
                            initialValue :``,
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`0`}>正常</Select.Option>
                                <Select.Option value={`1`}>已经删除</Select.Option>
                                <Select.Option value={`2`}>冻结</Select.Option>
                                <Select.Option value={`3`}>禁言</Select.Option>
                            </Select>
                        )}
                    </Col>

                    <Col span={2}>
                            <span>用户类型:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`userType`, {
                            initialValue :``,
                            rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            // 1.游客,2.验证客户,3.付费会员',
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`1`}>游客</Select.Option>
                                <Select.Option value={`2`}>验证客户</Select.Option>
                                <Select.Option value={`3`}>付费会员</Select.Option>
                                <Select.Option value={`4`}>预付费会员</Select.Option>
                            </Select>
                        )}
                    </Col>

                    <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                    {/* <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" onClick={() => addInfo()}>新建用户</Button>
                    </Col> */}
                   </Row>
                </FormItem>
            </Form>
            
            <Table columns={this.columns} dataSource={userList.list} pagination={
                {
                    total: userList.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const UserListContainersInfo = Form.create()(UserListContainers);
export default connect((state) => {
    return {
        userList: state.userReducer.userList,
    };
}, {
    dispatch,
    getData,
    updateSattus,
    editInfo,
    addInfo
})(UserListContainersInfo);