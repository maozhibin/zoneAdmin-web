import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {ApplyLists,updateUserType} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
class ApplyUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePage(1, 10);
        this.columns = [{
            title: '用户id',
            dataIndex: 'id',
        },  {
            title: '用户昵称',
            dataIndex: 'nickName',
        },
        //  {
        //     title: '图片',
        //     // dataIndex: 'img',
        //     // key: 'img',
        //     width:'15%',
        //     render: (record) => <img src={record.userAvatar} style={{ width: '50%' }}/>//这里放后台返回的图片的路径或者整个<img/>  
        //   },{
        //     title: '用户昵称',
        //     dataIndex: 'nickName',
        // },
        {
            title: '用户手机号码',
            dataIndex: 'userMobile',
        }, {
            title: '申请时间',
            render: (record) =><span className="ant-form-text">{moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateUserType} = this.props;
                return (
                    <span>
                       {
                            record.status == 2 ?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateUserType(record.id,3)}>通过</Button> :
                            <Button type="dashed" style={{marginLeft: 8}} disabled>通过</Button>
                        }

                        {
                            record.status == 2 ?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateUserType(record.id,1)}>拒绝</Button> :
                            <Button type="dashed" style={{marginLeft: 8}} disabled>拒绝</Button>
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
        this.props.ApplyLists({pageNo: pageNo, pageSize: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {ApplyLists} = this.props;
            const data =JSON.stringify({
                nickName:this.props.form.getFieldValue(`nickName`),
                userMobile:this.props.form.getFieldValue(`userMobile`),
            })
            ApplyLists(JSON.parse(data));
        });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {applayList} = this.props;
        const {searchInfo} = this.props;
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
                            <span>手机号:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`userMobile`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>


                    {/* <Col span={2}>
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
                    </Col> */}
                    <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                   </Row>
                </FormItem>
            </Form>
            
            <Table columns={this.columns} dataSource={applayList.list} pagination={
                {
                    total: applayList.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const ApplyUserListInfo = Form.create()(ApplyUserList);
export default connect((state) => {
    return {
        applayList: state.userReducer.applayList,
    };
}, {
    dispatch,
    ApplyLists,
    updateUserType
})(ApplyUserListInfo);