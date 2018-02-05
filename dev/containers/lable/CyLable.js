import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';
import moment from 'moment';
import {getData,deleteInfo,saveInfo} from '../../actions/CyLableAction';
import {Table,Message,Input,Form,Button,Col,Row,Select,DatePicker, TimePicker,Modal,Radio} from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

class CyLable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            id:``,
            labelName:``
        }
        this.changePage = this.changePage.bind(this);


        this.showModal  = this.showModal .bind(this);
        this.handleCancel  = this.handleCancel .bind(this);
        this.handleCreate  = this.handleCreate .bind(this);
        this.saveFormRef  = this.saveFormRef .bind(this);
        this.editInfo  = this.editInfo.bind(this);
        this.changePage(1, 10);
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
        },{
            title: '标签名',
            dataIndex: 'labelName',
        },{
            title: '关联用户数(关联不为0时不能进行删除)',
            dataIndex: 'userNum',
        },{
            title: '操作',
            dataIndex: '',
            render: (record) => {
                const {updateUserType} = this.props;
                const {deleteInfo} = this.props;
                return (
                    <span>
                         <Button type="dashed" onClick={this.editInfo.bind(this,record)}   style={{marginLeft: 8}} >编辑</Button>
                        {
                            record.userNum != 0 ?<Button type="danger" style={{marginLeft:8}} disabled>删除</Button>:<Button type="danger" onClick={() => deleteInfo(record.id)} style={{marginLeft: 8}} >删除</Button>
                        }
                         
                   </span>
                );
            },
        }];
    }

    editInfo(data,event) {
        this.setState(
            {
                 visible: true,
                 id: data.id,
                 labelName: data.labelName,
            });
      }
     showModal() {
        this.setState(
            {
                 visible: true,
                 id: ``,
                 labelName: ``,
            });
      }
      handleCancel(){
        this.setState({ visible: false });
      }
      handleCreate () {
        const form = this.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          const {saveInfo} = this.props;

          saveInfo(values)
          form.resetFields();
          this.setState({ visible: false });
        });
      }
      saveFormRef(form) {
        this.form = form;
      }


    showTotal(total) {
        return `共计 ${total} 条`;
    }

    changePage(pageNo, pageSize) {
        this.props.getData({pageNo: pageNo, pageSize: pageSize});
    }


    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const FormItem = Form.Item;
        const CollectionCreateForm = Form.create()(
            (props) => {
              const { visible, onCancel, onCreate, form } = props;
              const { getFieldDecorator } = form;
              return (
                <Modal
                  visible={visible}
                  title="新增或者编辑标签"
                  okText="Create"
                  onCancel={onCancel}
                  onOk={onCreate}
                >
                  <Form layout="vertical">
                        <FormItem
                            id="id"
                            label="ID"
                            {...formItemLayout}
                            required>
                            {getFieldDecorator('id', {
                                initialValue:this.state.id,
                            })(
                                <Input id="control-input" placeholder="Please enter..." disabled/>
                            )}
                        </FormItem>
                        <FormItem
                            id="labelName"
                            label="标签名"
                            {...formItemLayout}
                            required>
                            {getFieldDecorator('labelName', {
                                initialValue:this.state.labelName,
                                rules: [
                                    { required: true, message: 'Please select your country!' },
                                  ],
                            })(
                                <Input id="control-input" placeholder="Please enter..." />
                            )}
                        </FormItem>
                  </Form>
                </Modal>
              );
            }
          );










        const {cyLableAll} = this.props;
        return (
            <div>
            <Button type="primary" onClick={this.showModal}>添加标签</Button>
                    <CollectionCreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    />
                <br/>
                <Table columns={this.columns} dataSource={cyLableAll.list} pagination={
                    {
                        total: cyLableAll.total,
                        showTotal: this.showTotal,
                        onChange: this.changePage
                    }
                 }/>
            </div>
        );
    }
}
const CyLableInfo = Form.create()(CyLable);
export default connect((state) => {
    return {
        cyLableAll: state.cyLableReducer.cyLableAll,
    };
}, {
    dispatch,
    getData,
    deleteInfo,
    saveInfo
})(CyLableInfo);