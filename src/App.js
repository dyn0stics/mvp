import React, {Component} from 'react';
import logo from './Dyno_Logo_small.png';
import './App.css';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                username: ""
            }
        };
    }

    handleUsernameChange(e) {
        let self = this;
        this.setState({
            profile: {
                username: e.target.value
            }
        })
    }

    handleAccountChange(e) {
        let self = this;
        this.setState({
            profile: {
                username: self.state.profile.username
            }
        })
    }

    createAccount(){
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.createAccount.bind(this)}
                        >
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
