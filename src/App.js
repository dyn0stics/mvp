import React, {Component} from 'react';
import Web3 from 'web3';
import logo from './Dyno_Logo_small.png';
import './App.css';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import user_artifacts from '../build/contracts/User.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeInfo: null,
            accounts: [],
            profile: {
                username: "",
                account: ""
            }
        };
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      //  const User = contract(user_artifacts);
    }

    componentWillMount() {
        let self = this;
        this.web3.eth.getNodeInfo().then(function (response) {
            //  self.setState({nodeInfo: response});
        });
        this.web3.eth.getAccounts().then(function (response) {
            self.setState({accounts: response});
            self.setState({
                profile: {
                    username: self.state.profile.username,
                    account: response[0]
                }
            })
        });
    }

    handleUsernameChange(e) {
        let self = this;
        this.setState({
            profile: {
                username: e.target.value,
                account: self.state.profile.account
            }
        })
    }

    handleAccountChange(e) {
        let self = this;
        this.setState({
            profile: {
                username: self.state.profile.username,
                account: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <p className="App-intro">
                    {this.state.nodeInfo}
                </p>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            label="Username"
                            value={this.state.profile.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="select-currency"
                            select
                            label="Select"
                            value={this.state.profile.account}
                            onChange={this.handleAccountChange.bind(this)}
                            helperText="Please select your account"
                            margin="normal"
                        >
                            {this.state.accounts.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
            ;
    }
}

export default App;
