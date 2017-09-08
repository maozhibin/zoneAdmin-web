import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { dispatch } from 'caoh5-util';
import { browserHistory } from 'react-router'

class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // if(location.pathname=='/'){
        //     window.location.href='/login';
        // }else if(whiteMap.some(t=>window.location.pathname.includes(t))){
        //     return false;
        // }else if(getToken()){
        //     browserHistory.push('/public/guide');
        // }
    }

    render() {
        const { children } = this.props;
        return (
            <div className='con-index' onClick={this.userSet} >
                {children}
            </div>
        )
    }
}

export default connect(()=> {
    return {
    }
}, {
    dispatch
})(Index)
