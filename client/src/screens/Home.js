import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../logo.svg';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="App" className={classes.container}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to CSV Uploader.
        </p>
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={e => history.push('/get-started')}>
            Get started
        </Button>
          <Button variant="contained" color="secondary" onClick={e => history.push('/existing-uploads')}>
            Go to existing uploads
        </Button>
        </div>
      </header>
    </div>
  );
}

export default Home;
