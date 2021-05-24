import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  processing: {
    background: 'lightblue'
  },
  readyForDiscovery: {
    background: 'lightgreen'
  }
});

export default function UploadsCard({ id, fileName, processing, createdAt }) {
  const classes = useStyles();
  const history = useHistory();

  const handleViewDataClick = useCallback(() => {
    history.push(`/view-data/${id}`);
  }, [id]);

  return (
    <Card className={classes.root} variant="outlined">
      {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
        ID - {id}
      </Typography> */}
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {id}
        </Typography>
        <Typography variant="h5" component="h2">
          {fileName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Status - {processing ? 'Processing' : 'Ready for discovery'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Created on - {new Date(createdAt).toLocaleDateString()}
        </Typography>
        {processing && <CircularProgress />}
      </CardContent>
      <CardActions>
        <Button size="small" disabled={processing} onClick={handleViewDataClick}>View Data</Button>
      </CardActions>
    </Card>
  );
}
