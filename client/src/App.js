import React from 'react';
import {
  BrowserRouter, useHistory
} from 'react-router-dom';

import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';

import Routes from './Routes';

import './App.css';
import NavBar from './components/common/NavBar';

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
  const classes = useStyles();
  const history = useHistory();

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="xl">
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
