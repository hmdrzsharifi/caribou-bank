import React from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OfficeList from "./entities/office/OfficeList";
import ClientList from "./entities/client/ClientList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link, Route, BrowserRouter, Switch} from "react-router-dom";
import Home from "./Home";
import Tab from "@material-ui/core/Tab";
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import {ClickAwayListener} from '@material-ui/core';
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [anchorEl2, setAnchorEl2] = React.useState(null);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setAnchorEl2(event.currentTarget);

    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

   /* const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
    };*/
    const handleClose = (event) => {
        setAnchorEl(null);
        setAnchorEl2(null);

        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        // <div className="App">
        <div className="classes.root">
            <BrowserRouter>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title} color="inherit" component={Link} to='/' >
                                Caribou Bank
                            </Typography>

                           {/* <Button color="inherit" aria-controls="simple-menu"
                                    aria-haspopup="true" onClick={handleClick}>
                                Organization
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to='/office'>Office</MenuItem>
                            </Menu>

                            <Button color="inherit" aria-controls="simple-menu"
                                    aria-haspopup="true" onClick={handleClick}>
                                Client
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to='/client'>Client</MenuItem>
                                <MenuItem component={Link} to='/client'>Saving Account</MenuItem>
                                <MenuItem onClick={handleClose}>Organization</MenuItem>
                            </Menu>
*/}

                            <Button color="inherit"
                                name="el1"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={e => setAnchorEl(e.currentTarget)}
                            >
Client                            </Button>
                            <Menu
                                id="simple-menu"
                                name="el1"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem component={Link} to='/client'>Client</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>

                            <Button color="inherit"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={e => setAnchorEl2(e.currentTarget)}
                            >
Organization                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={() => setAnchorEl2(null)}
                            >
                                <MenuItem component={Link} to='/office'>Office</MenuItem>
                                <MenuItem onClick={handleClose}>My account 2</MenuItem>
                                <MenuItem onClick={handleClose}>Logout 2</MenuItem>
                            </Menu>
                            <Button component={Link} to='/login' color="inherit">Login</Button>

                        </Toolbar>
                    </AppBar>

                    {/*<Tab label="Home" component={Link} to="/"/>*/}
                    {/*<Link to="/">Home</Link>{' '}*/}
                    {/*<Link to="/client">Client</Link>{' '}*/}
                    {/*<Link to="/office">Office</Link>{' '}*/}
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/client" component={ClientList}/>
                        <Route path="/office" component={OfficeList}/>
                        <Route path="/login" component={SignIn}/>
                        <Route path="/links" render={() => <h1>Links</h1>}/>
                        <Route render={() => <h1>Page not found</h1>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
