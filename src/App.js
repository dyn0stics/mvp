import React, {Component} from 'react';
import 'typeface-roboto';
import logo from './Dyno_Logo_small.png';
import './App.css';
import axios from 'axios';
import { Grid, Row } from 'react-flexbox-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                username: ""
            },
            registerDialogOpen: false,
            loginDialogOpen: false
        };
    }

    handleUsernameChange = (e) => {
        this.setState({
            profile: {
                username: e.target.value
            }
        })
    }

    handleAccountChange = (e) => {
        let self = this;
        this.setState({
            profile: {
                username: self.state.profile.username
            }
        })
    }

    createAccount = (e) =>{
        const apiUrl = window.API_URL;
        let self = this;
        axios.get(apiUrl + "user/register?username=" + self.state.profile.username)
        .then(result => {
            console.log(result.data);
        })
    }

    handleOpen = (e) => {
        this.setState({registerDialogOpen: true});
    }

    handleLoginOpen = (e) => {
        this.setState({loginDialogOpen: true});
    }

    handleClose = (e) =>{
        this.setState({registerDialogOpen: false});
    }

    handleLoginClose = (e) => {
        this.setState({loginDialogOpen: false});
    }

    render() {
        return (
          <Grid fluid>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <p className="App-intro">
                    {this.state.nodeInfo}
                </p>
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
                      <TextField
                          id="username"
                          label="Username"
                          value={this.state.profile.username}
                          onChange={this.handleUsernameChange}
                          margin="normal"
                      />
                    </Row>
                    <Row>
                      <TextField
                          id="age"
                          label="Age"
                          value={this.state.profile.username}
                          onChange={this.handleUsernameChange}
                          margin="normal"
                      />
                    </Row>
                    <Row>
                      <TextField
                          id="weight"
                          label="Weight"
                          value={this.state.profile.username}
                          onChange={this.handleUsernameChange}
                          margin="normal"
                      />
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
                        <TextField
                            id="privateKey"
                            label="Private Key"
                            fullWidth
                            value={this.state.profile.username}
                            onChange={this.handleUsernameChange}
                            margin="normal"
                        />
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
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleOpen}
            >
                Register
            </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleLoginOpen}
            >
                Login
            </Button>
            </div>
            </Grid>
        )
            ;
    }
}

export default App;
