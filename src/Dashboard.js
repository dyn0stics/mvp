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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TrainingSessions from './dashboard/TrainingSessions.js';
import PurchaseOffers from './dashboard/PurchaseOffers.js';

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

class Dashboard extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Grid fluid>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>

                    <div>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={profile}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    Matthias S.
                                </Typography>
                                <Typography component="p">
                                    DYNO 150
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    0x501dbf48d1e29179e395dbaa8896d9ff0bacbff8
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <PurchaseOffers />
                    <TrainingSessions />
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(Dashboard);