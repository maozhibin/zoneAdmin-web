import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {queryIniviteUidUser} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
// var baserUrl=`http://zone-admin.test.upcdn.net`
class QueryIniviteUidUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteUid:this.props.location.state.inviteUid,
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePage(1, 10);
        this.columns = [{
            title: '用户id',
            dataIndex: 'id',
        },  {
            title: '被邀请人昵称',
            dataIndex: 'nickName',
        },{
            title: '被邀请时间',
            render: (record) =><span className="ant-form-text">{moment(record.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        }
       ];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize) {
        this.props.queryIniviteUidUser({offset: pageNo, limit: pageSize,inviteUid:this.state.inviteUid});
    }
    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         const {ApplyLists} = this.props;
    //         const data =JSON.stringify({
    //             nickName:this.props.form.getFieldValue(`nickName`),
    //             uid:this.props.form.getFieldValue(`uid`),
    //         })
    //         const {iniviteInfo}= this.props;
    //         iniviteInfo(JSON.parse(data));
    //     });

    // }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {iniviteListuser} = this.props;
        // const {searchInfo} = this.props;
        // const formItemLayout = {
        //     labelCol: { span: 5 },
        //     wrapperCol: { span: 20 },
        //   };
        return (
            <div>
            {/* <Form onSubmit={this.handleSubmit}>
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
                            <span>邀请码:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'uid' }}>
                        {getFieldDecorator(`uid`, {
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
            </Form> */}
            
            <Table columns={this.columns} dataSource={iniviteListuser.list} pagination={
                {
                    total: iniviteListuser.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const QueryIniviteUidUserPage = Form.create()(QueryIniviteUidUser);
export default connect((state) => {
    return {
        iniviteListuser: state.userReducer.iniviteListuser,
    };
}, {
    dispatch,
    queryIniviteUidUser
})(QueryIniviteUidUserPage);