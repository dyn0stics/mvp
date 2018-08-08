import React, {Component} from "react";
import PropTypes from "prop-types";
import "typeface-roboto";
import logo from "./Dyno_Logo_small.png";
import bg from "./bg.png";
import "./App.css";
import axios from "axios";
import {Grid, Row} from "react-flexbox-grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            age: "",
            weight: "",
            gender: "",
            country: "",
            registerDialogOpen: false,
            loginDialogOpen: false,
            registerCompleteDialogOpen: false,
            pk: "",
            address: "",
            mode: "sell"
        };
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };
    handleAgeChange = (e) => {
        this.setState({
            age: e.target.value
        })
    };
    handleWeightChange = (e) => {
        this.setState({
            weight: e.target.value
        })
    };
    handleGenderChange = (e) => {
        this.setState({
            gender: e.target.value
        })
    };
    handleCountryChange = (e) => {
        this.setState({
            country: e.target.value
        })
    };

    handleAccountChange = (e) => {
        let self = this;
        this.setState({
            username: self.state.profile.username
        })
    };

    createAccount = (e) => {
        const apiUrl = window.API_URL;
        let self = this;
        axios.get(apiUrl + "user/register?username=" + self.state.username)
            .then(result => {
                self.setState({registerDialogOpen: false}, function () {
                    self.setState({registerCompleteDialogOpen: true});
                    this.setState({username: result.data.username});
                    this.setState({pk: result.data.privateKey});
                    this.setState({address: result.data.address});
                });
            })
    };

    handleOpen = (e) => {
        this.setState({registerDialogOpen: true});
        this.setState({username: ""});
        this.setState({pk: ""});
        this.setState({address: ""});
    };

    handleLoginOpen = (e) => {
        this.setState({loginDialogOpen: true});
    };

    handleClose = (e) => {
        this.setState({registerDialogOpen: false});
    };

    handleLoginClose = (e) => {
        this.setState({loginDialogOpen: false});
    };

    handlePkChange = (e) => {
        this.setState({pk: e.target.value});
    };

    login = (e) => {
        if (this.state.mode === "sell") {
            this.props.history.push("/dashboard/" + this.state.pk);
        } else if (this.state.mode === "buy") {
            this.props.history.push("/customer/" + this.state.pk);
        }
    };

    handleModeChange = (e) => {
        this.setState({mode: e.target.value});
    };

    acknowledge = (e) => {
        this.setState({registerCompleteDialogOpen: false});
    };

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
                    <img src={bg} className="App-bg" alt="bg"/>
                    <Dialog
                        open={this.state.registerDialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Register</DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Please complete the form with initial information related to your profile.
                            </DialogContentText>
                            <Grid>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="username"
                                            label="Username"
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="age"
                                            label="Age"
                                            value={this.state.age}
                                            onChange={this.handleAgeChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="weight"
                                            label="Weight"
                                            value={this.state.weight}
                                            onChange={this.handleWeightChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="gender"
                                            label="Gender"
                                            value={this.state.gender}
                                            onChange={this.handleGenderChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="country"
                                            label="Country"
                                            value={this.state.country}
                                            onChange={this.handleCountryChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.createAccount} color="primary">
                                Complete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.loginDialogOpen}
                        onClose={this.handleLoginClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Your private key will not be stored or recorded in our systems.
                            </DialogContentText>
                            <Grid>
                                <Row>
                                    <FormControl component="fieldset" required fullWidth
                                                 className={classes.formControl}>
                                        <TextField
                                            id="privateKey"
                                            label="Private Key"
                                            fullWidth
                                            value={this.state.pk}
                                            onChange={this.handlePkChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required className={classes.formControl}>
                                        <FormLabel component="legend">Mode</FormLabel>
                                        <RadioGroup
                                            aria-label="mode"
                                            name="mode"
                                            className={classes.group}
                                            value={this.state.mode}
                                            onChange={this.handleModeChange}
                                        >
                                            <FormControlLabel value="sell" control={<Radio />} label="Seller"/>
                                            <FormControlLabel value="buy" control={<Radio />} label="Buyer"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Row>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleLoginClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.login} color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.registerCompleteDialogOpen}
                        onClose={this.handleRegisterCompleteClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Account Info</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please store your private key on a safe place.
                            </DialogContentText>
                            <Grid>
                                <Row>
                                    <FormControl component="fieldset" required fullWidth
                                                 className={classes.formControl}>
                                        <TextField
                                            id="privateKey"
                                            label="Private Key"
                                            fullWidth
                                            value={this.state.pk}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required fullWidth
                                                 className={classes.formControl}>
                                        <TextField
                                            id="privateKey"
                                            label="Address"
                                            fullWidth
                                            value={this.state.address}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.acknowledge} color="primary">
                                Acknowledge
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={this.handleOpen}
                    >Register
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={this.handleLoginOpen}
                    >Login
                    </Button>
                </div>
            </Grid>
        )
            ;
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
