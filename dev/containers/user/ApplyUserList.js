import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {ApplyLists,updateUserType,VerifyPage} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
var baserUrl=`http://zone-admin.test.upcdn.net`
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
        },{
            title: '用户手机号码',
            dataIndex: 'userMobile',
        }, {
            title: '申请时间',
            render: (record) =><span className="ant-form-text">{moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        },{
            title: '真实姓名',
            dataIndex: 'name',
        },{
            title: '身份证号码',
            dataIndex: 'cid',
        }, {
            title: '身份证图',
            width:'15%',
            render: (record) => <img src={baserUrl+record.cidUrl} style={{ width: '50%' }}/>//这里放后台返回的图片的路径或者整个<img/>  
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {VerifyPage} = this.props;
                return (
                    <span>
                       {
                            record.status == 2 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => VerifyPage(record.id)}>审核</Button> :''
                        }
                        {
                            record.status == 3 ?
                            <Button type="danger" style={{marginLeft: 8}} onClick={() => VerifyPage(record.id)}>重审</Button> :''
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
        this.props.ApplyLists({offset: pageNo, limit: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {ApplyLists} = this.props;
            const data =JSON.stringify({
                nickName:this.props.form.getFieldValue(`nickName`),
                userMobile:this.props.form.getFieldValue(`userMobile`),
                status:this.props.form.getFieldValue(`status`),
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


                    <Col span={2}>
                            <span>审核状态:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`status`, {
                            initialValue :``,
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`2`}>审核中</Select.Option>
                                <Select.Option value={`3`}>审核通过</Select.Option>
                            </Select>
                        )}
                    </Col>
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
    VerifyPage
})(ApplyUserListInfo);