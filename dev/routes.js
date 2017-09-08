import React from 'react';
import { Route,IndexRoute } from 'react-router';
import Index from './containers/Index';
import Public from './containers/Public';
import Login from './containers/Login';
import Module1Page1 from './containers/module1/Page1';
import Module1Page2 from './containers/module1/Page2';
import Module2Page1 from './containers/module2/Page1';
import Module2Page2 from './containers/module2/Page2';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Login}/>
    <Route path="public" component={Public}>
      <Route path="module1">
        <Route path="page1" component={Module1Page1} />
        <Route path="page2" component={Module1Page2} />
      </Route>
      <Route path="module2">
        <Route path="page1" component={Module2Page1} />
        <Route path="page2" component={Module2Page2} />
      </Route>
    </Route>
    <Route path="login" component={Login} />
    <Route path="*" component={Login} />
  </Route>
);
