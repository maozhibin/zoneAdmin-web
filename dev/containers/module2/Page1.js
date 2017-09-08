import React, {Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'caoh5-util';

class Module2Page1 extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        module2Page1
      </div>
    );
  }
}

export default connect(() => {
  return {};
}, {dispatch})(Module2Page1);