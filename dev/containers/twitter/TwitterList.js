import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import moment from 'moment';
import {getData} from '../../actions/TwitterAction';
import {Table,Message,Input,Form,Button,Col,Row,Select,DatePicker, TimePicker} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
class TwitterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePage(1, 10,`default`);
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
        },{
            title: '标题',
            dataIndex: 'title',
        },{
                title: '图片',
                width:'10%',
                render: (record) => <img src={record.icon} style={{ width: '30%' }}/>//这里放后台返回的图片的路径或者整个<img/>  
        },{
            title: '创建者',
            dataIndex: 'nickName',
        },{
            title: '内容',
            dataIndex: 'content',
            width:'40%',
            render: (text) => <span className="col-sql" title={text}>{text}</span>,
        },{
            title: '发帖时间',
            render: (record) =><span className="ant-form-text">{moment(record.createdTime).format("YYYY-MM-DD HH:mm:ss")}</span> 
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateUserType} = this.props;
                return (
                    <span>
                         <Button type="danger" style={{marginLeft: 8}} >删除</Button>
                  </span>
                );
            },
        }];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize,twitterType) {
        this.props.getData({pageNo: pageNo, pageSize: pageSize,twitterType:twitterType});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            const {getData} = this.props;
            const data =JSON.stringify({
                title:this.props.form.getFieldValue(`title`),
                twitterType:this.props.form.getFieldValue(`twitterType`),
                pushStatus:this.props.form.getFieldValue(`pushStatus`),
            })
            getData(JSON.parse(data));
        });

    }

    

    render() {
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };

        const {getFieldDecorator} = this.props.form;
        const {twitterList} = this.props;
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
                            <span>标题:</span>
                   </Col>
                    <Col span={3} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`title`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                   <Col span={2}>
                            <span>发帖人昵称:</span>
                   </Col>
                    <Col span={3} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`nickName`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={2}>
                            <span>创建时间:</span>
                   </Col>
                    <Col span={6}>
                        {getFieldDecorator(`createdTime`,rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                         <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                   </Row>
                </FormItem>
            </Form>
            
            <Table columns={this.columns} dataSource={twitterList.list} pagination={
                {
                    total: twitterList.total,
                    showTotal: this.showTotal,
                    onChange: this.changePage
                }
            }/>
            </div>
        );
    }
}
const TwitterListInfo = Form.create()(TwitterList);
export default connect((state) => {
    return {
        twitterList: state.twitterReducer.twitterList,
    };
}, {
    dispatch,
    getData
})(TwitterListInfo);