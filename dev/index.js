import 'caoh5-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import './less/main.less';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

history.listen((location)=>{
  console.log(location)
});

render(
  <Root store={store} history={history} />,
  window.document.getElementById('root'),
);
