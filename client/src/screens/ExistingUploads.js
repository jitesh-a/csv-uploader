import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useApi } from '../hooks/useApi';
import { Button, Container, Grid } from '@material-ui/core';
import UploadsCard from '../components/uploads/UploadsCard';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ExistingUploads() {

  const classes = useStyles();
  const location = useLocation();

  const { loading, data, error, refetch } = useApi('/api/uploads');

  const renderUploads = useCallback(() => {
    return data?.length && data.map((upload, index) => <UploadsCard key={upload?.id || index} {...upload} />)
  }, [data]);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className={classes.root}>
      <h2>Existing Uploads</h2>
      <Button onClick={e => refetch()}>Refresh</Button>
      <Grid container spacing={2}>
        {renderUploads()}
      </Grid>
    </div>
  );
}
