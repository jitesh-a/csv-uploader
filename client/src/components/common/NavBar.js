import React from 'react';
import {
  BrowserRouter, useHistory
} from 'react-router-dom';

import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';

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

function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
        <Typography variant="h6" className={classes.title} onClick={e => history.push('/')}>
          CSV Uploader
            </Typography>
        <Button color="inherit" onClick={e => history.push('/get-started')}>Get started</Button>
        <Button color="inherit" onClick={e => history.push('/existing-uploads')}>Existing Uploads</Button>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
