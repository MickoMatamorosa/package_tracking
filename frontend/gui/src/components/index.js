import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';

class Main extends Component {
    
    render() {
        return (
            <Fragment>
                <Header/>
            </Fragment>
        )
    }
}

Main.propTypes = {
    isAuth: PropTypes.bool
};

export default Main