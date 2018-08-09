import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "typeface-roboto";
import "../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import BackupIcon from "@material-ui/icons/Backup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid, Row} from "react-flexbox-grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/lab/Slider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";


function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'user', numeric: false, disablePadding: true, label: 'User Address'},
    {id: 'ipfs', numeric: true, disablePadding: false, label: 'IPFS Hash'},
    {id: 'data', numeric: true, disablePadding: false, label: 'Data'},
    {id: 'action', numeric: true, disablePadding: false, label: 'Action'}
];

const countries = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const apiUrl = window.API_URL;

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">

                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root)}
        >
            <div className={classes.title}>
                {
                    <Typography variant="title" id="tableTitle">

                    </Typography>
                }
            </div>
            <div className={classes.spacer}/>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'desc',
            orderBy: 'address',
            selected: [],
            data: [],
            loadDialogOpen: false,
            purchaseDialogOpen: false,
            purchase: {
                address: "",
                price: "",
            },
            ipfs: null,
            page: 0,
            rowsPerPage: 5,
            ipfsDialogOpen: false,
            pk: "",
            age: 50,
            countries: [],
        };
    }

    componentDidMount = () => {
        let self = this;
        this.setState({loadDialogOpen: true});
        axios.get(apiUrl + "search")
            .then(result => {
                self.setState({data: result.data}, () => {
                    self.setState({loadDialogOpen: false});
                });
            })
            .catch(ex => {
                self.setState({loadDialogOpen: false});
            });
        this.setState({pk: self.props.pk});
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleIPFSLink = (event, hash) => {
        let self = this;
        this.setState({loadDialogOpen: true});
        axios.get(apiUrl + "ipfs?hash=" + hash)
            .then(result => {
                this.setState({ipfs: result.data}, () => {
                    this.setState({ipfsDialogOpen: true}, () => {
                        self.setState({loadDialogOpen: false});
                    });
                });
            })
            .catch(ex => {
                self.setState({loadDialogOpen: false});
            });
    };

    closeIpfsDialog = () => {
        this.setState({ipfsDialogOpen: false});
    };

    closePurchaseDialog = () => {
        this.setState({purchaseDialogOpen: false});
    };

    handleBuy = (event, address) => {
        this.setState({purchaseDialogOpen: true});
        var self = this;
        this.setState({
            purchase: {
                address: address,
                price: self.state.purchase.price
            }
        })
    };

    handleAmountChange = (event) => {
        var self = this;
        this.setState({
            purchase: {
                address: self.state.purchase.address,
                price: event.target.value
            }
        })
    };

    sendPurchaseOffer = () => {
        var self = this;
        this.setState({loadDialogOpen: true});
        axios.get(apiUrl + "purchase?address=" + this.state.purchase.address + "&price=" + this.state.purchase.price + "&pk=" + this.state.pk)
            .then(result => {
                self.setState({loadDialogOpen: false});
                this.setState({purchaseDialogOpen: false});
            })
            .catch(ex => {
                self.setState({loadDialogOpen: false});
            });
    };

    handleAgeChange = (event, value) => {
        this.setState({age: value});
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        var i = 0;
        return (
            <div>
                <Paper className={classes.root}>
                    <Grid>
                        <Row>
                            <FormControl component="fieldset" required
                                         className={classes.formControl}>
                                <Typography id="label">Max Age</Typography>
                                <Slider value={this.state.age} aria-labelledby="label"
                                        onChange={this.handleAgeChange}/>
                            </FormControl>
                            <FormControl component="fieldset" required
                                         className={classes.formControl}>
                                <Typography id="label">Max Weigth</Typography>
                                <Slider value={this.state.age} aria-labelledby="label"
                                        onChange={this.handleAgeChange}/>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Name</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple"/>}
                                    MenuProps={MenuProps}
                                >
                                    {countries.map(name => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={{
                                                fontWeight: this.state.countries.indexOf(name) === -1
                                                    ? theme.typography.fontWeightRegular
                                                    : theme.typography.fontWeightMedium,
                                            }}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl component="fieldset" required
                                         className={classes.formControl}>
                                <TextField
                                    id="Amount"
                                    label="Amount (DYNO)"
                                    value={this.state.purchase.price}
                                    onChange={this.handleAmountChange}
                                    margin="normal"
                                />
                            </FormControl>
                            <Button onClick={this.search} color="primary">
                                Search
                            </Button>
                        </Row>
                    </Grid>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {
                                    data
                                        .sort(getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(n => {
                                            n.id = i++;
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell padding="checkbox">

                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        {n.address}
                                                    </TableCell>
                                                    <TableCell numeric>{n.ipfsHash}</TableCell>
                                                    <TableCell numeric>
                                                        <BackupIcon
                                                            onClick={event => this.handleIPFSLink(event, n.ipfsHash)}/>
                                                    </TableCell>
                                                    <TableCell numeric>
                                                        <Button
                                                            color="primary"
                                                            className={classes.button}
                                                            onClick={event => this.handleBuy(event, n.address)}
                                                        >
                                                            Buy
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    <Dialog
                        open={this.state.ipfsDialogOpen}
                        onClose={this.closeIpfsDialog}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Training Session</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {JSON.stringify(this.state.ipfs)}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeIpfsDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.purchaseDialogOpen}
                        onClose={this.closePurchaseDialog}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Purchase Offer</DialogTitle>
                        <DialogContent>
                            <Grid>
                                <Row>
                                    <FormControl component="fieldset" required fullWidth
                                                 className={classes.formControl}>
                                        <TextField
                                            id="address"
                                            label="Address"
                                            value={this.state.purchase.address}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl component="fieldset" required
                                                 className={classes.formControl}>
                                        <TextField
                                            id="Amount"
                                            label="Amount (DYNO)"
                                            value={this.state.purchase.price}
                                            onChange={this.handleAmountChange}
                                            margin="normal"
                                        />
                                    </FormControl>
                                </Row>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closePurchaseDialog} color="primary">
                                Close
                            </Button>
                            <Button onClick={this.sendPurchaseOffer} color="primary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.loadDialogOpen}>
                        <DialogContent>
                            <CircularProgress />
                        </DialogContent>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

SearchResults.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);