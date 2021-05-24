import React, { useCallback, useState } from 'react';
import { Button, Container, Grid, makeStyles, TextField } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import EmployeeList from '../components/employee/EmployeeList';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function ViewData() {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={classes.root}>
      <h2>Showing data for {id} </h2>
      <Grid container className={classes.root}>
        <TextField id="outlined-basic" label="Live Search" variant="outlined" onChange={e => setSearchValue(e.target.value)} />
        {/* <Button size="small" color="primary" onClick={e => history.push('/get-started')}>
          Search
        </Button> */}
      </Grid>
      <Grid container>
        <EmployeeList uploadsId={id} searchValue={searchValue} />
      </Grid>
      <Grid container className={classes.root}>
        {/* <Button variant="contained" color="primary" onClick={e => history.push('/get-started')}>
          Get started with new
        </Button>
        <Button variant="contained" color="secondary" onClick={e => history.push('/existing-uploads')}>
          Back to uploads
        </Button> */}
      </Grid>
    </div>
  );
}
