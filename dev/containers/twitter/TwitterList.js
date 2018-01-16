import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import {getData} from '../../actions/TwitterAction';
import {Table,Message,Input,Form,Button,Col,Row,Select} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
class TwitterList extends Component {
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
        },{
            title: '标题',
            dataIndex: 'title',
        }, {
            title: '发帖人昵称',
            dataIndex: 'nickName',
        }, {
            title: '帖子类型',
            dataIndex: 'twitterTypeName',
        }, {
            title: '帖子板块',
            dataIndex: 'topicClassName',
        }, {
            title: '展示内容',
            dataIndex: 'showContent',
        },{
            title: '帖子状态',
            dataIndex: 'pushStatusValue',
        }, {
            title: '发帖时间',
            dataIndex: 'createdTime',
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateUserType} = this.props;
                return (
                    <span>
                       {
                            record.idx != 1 ?
                            <Button type="dashed" style={{marginLeft: 8}} onClick={() => updateUserType(record.id,3)}>置顶</Button> :
                            <Button type="dashed" style={{marginLeft: 8}} >取消置顶</Button>
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
                title:this.props.form.getFieldValue(`title`),
                twitterType:this.props.form.getFieldValue(`twitterType`),
                pushStatus:this.props.form.getFieldValue(`pushStatus`),
            })
            getData(JSON.parse(data));
        });

    }
    render() {
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
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`title`, {
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={2}>
                            <span>帖子类型:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`twitterType`, {
                            initialValue :``,
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`default`}>普通贴</Select.Option>
                                <Select.Option value={`joint-work`}>协作帖</Select.Option>
                                <Select.Option value={`activity`}>获得贴</Select.Option>
                                <Select.Option value={`vote`}>投票贴</Select.Option>
                            </Select>
                        )}
                    </Col>
                    <Col span={2}>
                            <span>是否可用:</span>
                   </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        {getFieldDecorator(`pushStatus`, {
                            initialValue :``,
                            // rules: [{required: true, message: 'Please input the captcha you logicTable!'}],
                        })(
                            <Select>
                                <Select.Option value={``}>全部</Select.Option>
                                <Select.Option value={`0`}>已发布</Select.Option>
                                <Select.Option value={`1`}>已隐藏</Select.Option>
                                <Select.Option value={`2`}>草稿</Select.Option>
                                <Select.Option value={`3`}>删除</Select.Option>
                            </Select>
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