import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {getblack,deleteBlack} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
class BlackUserList extends Component {
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
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {deleteBlack} = this.props;
                return (
                    <span>
                       <Button type="danger" onClick={() => deleteBlack(record.id)}>删除</Button>
                    </span>
                );
            },
        }];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }


    changePage(pageNo, pageSize) {
        this.props.getblack({offset: pageNo, limit: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {getblack} = this.props;
            const data =JSON.stringify({
                nickName:this.props.form.getFieldValue(`nickName`),
                userMobile:this.props.form.getFieldValue(`userMobile`),
            })
            getblack(JSON.parse(data));
        });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {blackList} = this.props;
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
                    <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                   </Row>
                </FormItem>
            </Form>
            
            <Table columns={this.columns} dataSource={blackList.list} pagination={
                {
                    total: blackList.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const BlackUserListInfo = Form.create()(BlackUserList);
export default connect((state) => {
    return {
        blackList: state.userReducer.blackList,
    };
}, {
    dispatch,
    getblack,
    deleteBlack
})(BlackUserListInfo);