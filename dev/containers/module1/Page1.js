import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'caoh5-util';
import { Table, Button, Modal, Message } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class Module1Page1 extends Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    }
    this.onSelectChange=this.onSelectChange.bind(this);
    this.start=this.start.bind(this);
    // this.subMenuClick=this.subMenuClick.bind(this);
  }
  start() {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  openModal(){
    Modal.info({
      title:'123',
      content: '123123123'
    })
  }
  openMessage(){
    Message.success('This is a message of success');
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          <Button type="ghost" onClick={this.openModal} style={{ marginLeft: 8 }}>Modal</Button>          
          <Button type="ghost" onClick={this.openMessage} style={{ marginLeft: 8 }}>Message</Button>          
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);
export default connect(() => {
  return {};
}, {
  dispatch,
})(Module1Page1);