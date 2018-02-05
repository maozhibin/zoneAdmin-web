import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {dispatch} from 'caoh5-util';
import {getData,updateSattus,editInfo,addInfo,getLable,addBlack,cyLableList} from '../../actions/UserAction';
import {Table,Form, Input, Button, Message,Select,Upload,Icon,Modal,Col,Row,Radio,InputNumber,DatePicker, TimePicker} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
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
            title: '用户手机号码',
            dataIndex: 'userMobile',
        }, {
            title: '用户类型',
            dataIndex: 'userTypeValue',
        },{
            title: '标签',
            dataIndex: 'lableName',
        },{
            title: '注册时间',
            render: (record) =><span className="ant-form-text">{moment(record.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateSattus} = this.props;
                const {editInfo} = this.props;
                const {addBlack} = this.props;
                return (
                    <span>
                       <Button type="dashed" onClick={() => editInfo(record)}>编辑</Button>
                       &nbsp;&nbsp;&nbsp;
                       <Button type="dashed" onClick={() => addBlack(record.id)}>加入黑名单</Button>
                       {/* {
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
                        } */}
                  </span>
                );
            },
        }];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize) {
        this.props.getData({offset: pageNo, limit: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {getData} = this.props;
            if(this.props.form.getFieldValue(`createdTime`) != undefined){
                console.log(this.props.form.getFieldValue(`createdTime`)[1]._d)
                const data =JSON.stringify({
                    nickName:this.props.form.getFieldValue(`nickName`),
                    userMobile:this.props.form.getFieldValue(`userMobile`),
                    status:this.props.form.getFieldValue(`status`),
                    endTimeStr: moment(this.props.form.getFieldValue(`createdTime`)[1]._d).format("YYYY-MM-DD HH:mm:ss"),
                    startTimeStr: moment(this.props.form.getFieldValue(`createdTime`)[0]._d).format("YYYY-MM-DD HH:mm:ss"),
                    lableIdList:this.props.form.getFieldValue(`lableId`),
                })
                getData(JSON.parse(data));
            }else{
                const data =JSON.stringify({
                    nickName:this.props.form.getFieldValue(`nickName`),
                    userMobile:this.props.form.getFieldValue(`userMobile`),
                    status:this.props.form.getFieldValue(`status`),
                    lableIdList:this.props.form.getFieldValue(`lableId`),
                })
                getData(JSON.parse(data));
            }
        });

    }

    componentWillMount() {
        const {getLable} = this.props;
        getLable();
        
    }

    render() {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };
        //标签
        const {getLableCount} = this.props;
        var lableList = getLableCount.list;
        var children = [];
        for (let i = 0; i < lableList.length; i++) {
            children.push(<Select.Option key={lableList[i].id.toString()}>{lableList[i].labelName}</Select.Option>);
        }


        const {getFieldDecorator} = this.props.form;
        const {userList} = this.props;
        const {searchInfo} = this.props;
        const {addInfo} = this.props;
        const {cyLableList} = this.props;

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
                   <Row gutter={25}>
                   <Col span={1}>
                            <span>平台昵称:</span>
                   </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`nickName`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={1}>
                            <span>手机号:</span>
                   </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`userMobile`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>

                    <Col span={1}>
                            <span>用户类型:</span>
                   </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`status`, {
                            initialValue :``,
                            rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            // 1.游客,2.验证客户,3.付费会员',
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`0`}>游客</Select.Option>
                                <Select.Option value={`1`}>手机会员</Select.Option>
                                <Select.Option value={`2`}>待审核Vip</Select.Option>
                                <Select.Option value={`3`}>付费vip</Select.Option>
                            </Select>
                        )}
                    </Col>
                    {/* <Col span={1} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col> */}
                    <Col span={1}>
                            <span>注册时间:</span>
                   </Col>
                    <Col span={6}>
                        {getFieldDecorator(`createdTime`,rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </Col>


                    <Col span={1}>
                            <span>标签:</span>
                   </Col>
                    <Col span={3}>
                        {getFieldDecorator(`lableId`)(
                           <Select
                           mode="multiple"
                           style={{ width: '100%' }}
                           placeholder="Please select"
                           // defaultValue={['a10', 'c12']}
                       >
                         {children}
                       </Select>
                        )}
                    </Col>
                    <Col span={1} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                   
                   </Row>
                </FormItem>
            </Form>
            <Row gutter={5}>
                    <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">黑名单管理</Button>
                    </Col>

                    <Col span={2} style={{ textAlign: 'right' }}>
                          <Button type="primary" onClick={() => cyLableList()}>标签管理</Button>
                    </Col>
            </Row>
            <br/>
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
        getLableCount : state.userReducer.cyLableCount,
    };
}, {
    dispatch,
    getData,
    updateSattus,
    editInfo,
    addInfo,
    getLable,
    addBlack,
    cyLableList
})(UserListContainersInfo);