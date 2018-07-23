import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import logo from "./Dyno_Logo_small.png";
import profile from "./Dyno_Logo_small.png";
import "./App.css";
import axios from "axios";
import {Grid} from "react-flexbox-grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TrainingSessions from "./dashboard/TrainingSessions.js";
import PurchaseOffers from "./dashboard/PurchaseOffers.js";

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

    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                address: "",
            },
            workout: null
        };
    }

    componentDidMount() {
        const apiUrl = window.API_URL;
        let self = this;
        axios.get(apiUrl + "user/profile?pk=" + self.props.match.params.pk)
            .then(result => {
                self.setState({loginDialogOpen: false}, () => {
                    self.setState({data: result.data});
                    self.setState({workout: JSON.parse(result.data.data.workoutData)});
                });
            })
    }

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
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={profile}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {this.state.data.username}
                                </Typography>
                                <Typography component="p">
                                    DYNO 150
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    {this.state.data.address}
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <PurchaseOffers />
                    <TrainingSessions data={this.state.workout}/>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(Dashboard);