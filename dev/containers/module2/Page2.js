import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';

class Module2Page2 extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        module2Page2
      </div>
    );
  }
}

export default connect(() => {
  return {};
}, {dispatch})(Module2Page2);