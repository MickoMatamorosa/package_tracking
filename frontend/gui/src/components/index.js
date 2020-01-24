import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';

class Main extends Component {
    componentDidMount(){
        
    }
    
    render() {
        return (
            <Fragment>
                <Header {...this.props}/>
            </Fragment>
        )
    }
}

Main.propTypes = {
    isAuth: PropTypes.bool
};

export default Main