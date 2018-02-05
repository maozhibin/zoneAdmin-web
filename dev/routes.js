import React from 'react';
import { Route,IndexRoute } from 'react-router';
import Index from './containers/Index';
import Public from './containers/Public';
import Login from './containers/Login';
import userList from './containers/user/UserListContainers';
import useRexhibition from './containers/user/useRexhibition';
import UserEdit from './containers/user/UserEdit';
import ApplyUserList from './containers/user/ApplyUserList';
import TwitterList from './containers/twitter/TwitterList';
import Verify from './containers/user/Verify'
import CyLable from './containers/lable/CyLable'
import BlackUserList from './containers/user/BlackUserList'
import UserInviteInfoList from './containers/user/UserInviteInfoList'
import QueryIniviteUidUser from './containers/user/QueryIniviteUidUser'

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Login}/>
    <Route path="public" component={Public}>
      <Route path="module1">
        <Route path="userList" component={userList} />
        <Route path="useRexhibition" component={useRexhibition} />
        <Route path="UserEdit" component={UserEdit} />
        <Route path="ApplyUserList" component={ApplyUserList} />
        <Route path="Verify" component={Verify} />
        <Route path="CyLable" component={CyLable} />
        <Route path="BlackUserList" component={BlackUserList} />
        <Route path="UserInviteInfoList" component={UserInviteInfoList} />
        <Route path="QueryIniviteUidUser" component={QueryIniviteUidUser} />
      </Route>
      <Route path="module2">
      <Route path="TwitterList" component={TwitterList} />
      </Route>
    </Route>
    <Route path="login" component={Login} />
    <Route path="*" component={Login} />
  </Route>
);
