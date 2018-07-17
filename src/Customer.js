import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import logo from './Dyno_Logo_small.png';
import profile from './Dyno_Logo_small.png';
import './App.css';
import axios from 'axios';
import {Grid, Row} from 'react-flexbox-grid';
import Button from '@material-ui/core/Button';
import PurchaseOffers from './customer/PurchaseOffers.js';
import SearchResults from './customer/SearchResults';

const styles = theme => ({
    card: {
        marginTop: 30,
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class Customer extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Grid fluid>
                <div className="App">
                    <header className="App-header">
                        <a href="/">
                            <img src={logo} className="App-logo" alt="logo"/>
                        </a>
                    </header>

                    <div>
                    </div>
                    <SearchResults />
                    <PurchaseOffers />
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(Customer);