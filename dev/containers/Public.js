import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from 'caoh5-util';
import { browserHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class Public extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      current: 'home',
      open: 'module1'
    }
    this.toggle=this.toggle.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.subMenuClick=this.subMenuClick.bind(this);
  }
  componentWillMount() {
    this.initPage()
  }
  componentWillReceiveProps(nextProps){
    this.initPage()
  }
  initPage(){
    if(!localStorage.token){
      browserHistory.push('/login');  
      return  
    }
    let pathName = window.location.pathname;
    this.setState({
      open: pathName.split('/')[2],
      current: pathName
    });
  }
  logout(){
    localStorage.clear()
    browserHistory.push('/login');      
  }
  subMenuClick(e){
    this.setState({
      open: e.key
    })
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    });
    browserHistory.push(e.key);    
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const year = new Date().getFullYear();
    const { children,location } = this.props;    
    return (
      <Layout className="components-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ height: '100vh', position: 'fixed', left: 0, zIndex: 9 }}
        >
          <div className="logo" />
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            onClick={this.handleClick}
            openKeys={[this.state.open]}
            selectedKeys={[this.state.current]}
          >
            <SubMenu key="module1" onTitleClick={this.subMenuClick} title={<span><Icon type="mail" /><span>Module One</span></span>}>
              <Menu.Item key="/public/module1/page1">Page 1</Menu.Item>
              <Menu.Item key="/public/module1/page2">Page 2</Menu.Item>
            </SubMenu>
            <SubMenu key="module2" onTitleClick={this.subMenuClick} title={<span><Icon type="appstore" /><span>Module Two</span></span>}>
              <Menu.Item key="/public/module2/page1">Page 1</Menu.Item>
              <Menu.Item key="/public/module2/page2">Page 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 64 : 200 ,minHeight: '100vh'}}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="userInfo">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Menu mode="horizontal" onClick={this.logout}>
                <SubMenu
                  style={{
                    float: 'right',
                  }}
                  title={<span>
                    <Icon type="user" />
                    123
                  </span>}
                >
                  <Menu.Item key="logout" >
                    Sign out
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div className="transition-group" key={this.props.location.pathname}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>{year} &copy; CAOCAO</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(() => {
  return {};
}, {
  dispatch,
})(Public);



