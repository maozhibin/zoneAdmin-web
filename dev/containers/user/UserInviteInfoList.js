import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {iniviteInfo,byIniviteIdList} from '../../actions/UserAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
class UserInviteInfoList extends Component {
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
            title: '邀请码',
            dataIndex: 'uid',
        }, {
            title: '生成时间',
            render: (record) =><span className="ant-form-text">{moment(record.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        },
        {
            title: '邀请人数',
            dataIndex: '',
            render: (record) => {
                const {byIniviteIdList} = this.props;
                return (
                    <span>
                     <Button style={{marginLeft: 8}} onClick={() => byIniviteIdList(record.uid)}>{record.iniviteCount}</Button>
                  </span>
                );
            }}];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize) {
        this.props.iniviteInfo({offset: pageNo, limit: pageSize});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {ApplyLists} = this.props;
            const data =JSON.stringify({
                nickName:this.props.form.getFieldValue(`nickName`),
                uid:this.props.form.getFieldValue(`uid`),
            })
            const {iniviteInfo}= this.props;
            iniviteInfo(JSON.parse(data));
        });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {iniviteList} = this.props;
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
            </Form>
            
            <Table columns={this.columns} dataSource={iniviteList.list} pagination={
                {
                    total: iniviteList.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const UserInviteInfoListPage = Form.create()(UserInviteInfoList);
export default connect((state) => {
    return {
        iniviteList: state.userReducer.iniviteList,
    };
}, {
    dispatch,
    iniviteInfo,
    byIniviteIdList
})(UserInviteInfoListPage);