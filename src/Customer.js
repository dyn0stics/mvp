import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import "typeface-roboto";
import logo from "./Dyno_Logo_small.png";
import "./App.css";
import {Grid} from "react-flexbox-grid";
import PurchaseOffers from "./customer/PurchaseOffers.js";
import SearchResults from "./customer/SearchResults";

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

    constructor(props) {
        super(props);
    }

    render() {
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
                    <SearchResults pk={this.props.match.params.pk}/>
                    <PurchaseOffers pk={this.props.match.params.pk}/>
                </div>
            </Grid>
        );
    }
}

export default withStyles(styles)(Customer);