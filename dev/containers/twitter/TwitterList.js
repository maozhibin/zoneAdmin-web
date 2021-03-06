import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import moment from 'moment';
import {getData,updatePushStatus,deleteInfo} from '../../actions/TwitterAction';
import {Table,Message,Input,Form,Button,Col,Row,Select,DatePicker, TimePicker} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
var baserUrl=`http://zone-admin.test.upcdn.net`
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
                render: (record) => <img src={baserUrl+record.icon} style={{ width: '30%' }}/>//这里放后台返回的图片的路径或者整个<img/>  
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
            title: '帖子状态',
            dataIndex: 'pushStatusValue',
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updatePushStatus} = this.props;
                const {deleteInfo} = this.props;
                return (
                    <span>
                        {
                            record.pushStatus == -1 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => updatePushStatus(record.id,0,`default`)}>显示</Button> :''
                        }
                        {
                            record.pushStatus == 0 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => updatePushStatus(record.id,-1,`default`)}>隐藏</Button> :''
                        }
                        {
                            record.pushStatus == 1 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => updatePushStatus(record.id,0,`default`)}>审核通过发布</Button> :''
                        }
                        {
                            record.pushStatus == 1 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => updatePushStatus(record.id,2,`default`)}>拒绝通过</Button> :''
                        }
                        {
                            record.pushStatus == 2 ?
                            <Button type="primary" style={{marginLeft: 8}} onClick={() => updatePushStatus(record.id,0,`default`)}>重新审核通过发布</Button> :''
                        }
                         <Button type="danger" style={{marginLeft: 8}}  onClick={() => deleteInfo(record.id,`default`)}>删除</Button>
                   </span>
                );
            },
        }];
    }

    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize,twitterType) {
        this.props.getData({offset: pageNo, limit: pageSize,twitterType:'default'});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {getData} = this.props;
            if(this.props.form.getFieldValue(`createdTime`)!=undefined){
                const data =JSON.stringify({
                    title:this.props.form.getFieldValue(`title`),
                    nickName:this.props.form.getFieldValue(`nickName`),
                    endTime: moment(this.props.form.getFieldValue(`createdTime`)[1]._d).format("YYYY-MM-DD HH:mm:ss"),
                    statrTime: moment(this.props.form.getFieldValue(`createdTime`)[0]._d).format("YYYY-MM-DD HH:mm:ss"),
                    twitterType:'default',
                    pushStatus:this.props.form.getFieldValue(`pushStatus`),
                })
                getData(JSON.parse(data));
            }else{
                const data =JSON.stringify({
                    title:this.props.form.getFieldValue(`title`),
                    nickName:this.props.form.getFieldValue(`nickName`),
                    twitterType:'default',
                    pushStatus:this.props.form.getFieldValue(`pushStatus`),
                })
                getData(JSON.parse(data));
            }
            
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
                        })(
                            <Input/>
                        )}
                    </Col>
                   <Col span={2}>
                            <span>发帖人昵称:</span>
                   </Col>
                    <Col span={3} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`nickName`, {
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={1}>
                            <span>显示状态:</span>
                   </Col>
                    <Col span={2} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`pushStatus`, {
                        })(
                            <Select>
                            <Select.Option value={``}>全部</Select.Option>
                            <Select.Option value={`-1`}>隐藏</Select.Option>
                            <Select.Option value={`0`}>已发布</Select.Option>
                            <Select.Option value={`1`}>审核中</Select.Option>
                            <Select.Option value={`2`}>审核未通过</Select.Option>
                        </Select>
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
    getData,
    updatePushStatus,
    deleteInfo
})(TwitterListInfo);