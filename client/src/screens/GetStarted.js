import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Container, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import Alert from '../components/common/Alert';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginLeft: 16
  }
}));

export default function GetStarted() {
  const classes = useStyles();
  const history = useHistory();

  const [formState, setFormState] = useState({
    file: null,
    error: false,
    errorMessage: '',
    loading: 0
  });

  const handleFileInputChange = useCallback((event) => {
    if (event.target && event.target.files[0]) {
      formState.file = event.target.files[0];
      formState.error = false;
      formState.errorMessage = '';
    } else {
      formState.file = event.target.files[0];
    }
    setFormState({ ...formState });
  }, [formState]);

  const handleUpload = useCallback((event) => {

    if (!formState.file) {
      return;
    }

    const data = new FormData();
    const { name, type } = formState.file;

    if (type !== 'text/csv') {
      formState.error = true;
      formState.errorMessage = 'Invalid file type';
      setFormState({ ...formState });
    }

    else {

      data.append('file', formState.file, name);

      formState.loading = 1;
      setFormState({ ...formState });

      axios
        .post('/api/uploads',
          data,
          {
            onUploadProgress: ProgressEvent => {
              if (name === '') {
                return;
              } else {
                formState.loading = Number(((ProgressEvent.loaded / ProgressEvent.total) * 100).toFixed());
                setFormState({ ...formState });
              }
            }
          })
        .then(res => {
          console.log(res.statusText);
          history.push('/existing-uploads');
        })
        .catch(error => {
          console.error(error);
          formState.error = true;
          formState.errorMessage = error;
          formState.loading = 0;
          setFormState({ ...formState });
        })
    }
  }, [formState]);

  const getButtonText = useMemo(() => {
    return formState.loading ? `Uploading ${formState.loading}` : 'Submit';
  }, [formState]);

  return (
    <div className={classes.root}>
      <h2>Get started</h2>
      <Grid container spacing={2} className={classes.root}>
        <TextField type="file" variant="outlined" onChange={handleFileInputChange} />
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={formState.loading || !formState.file}
          onClick={handleUpload}>
          {getButtonText}
        </Button>
        <Button variant="text" color="primary" href="https://csv-uploader-bucket.s3.ap-south-1.amazonaws.com/Sample_Employee_Reecords.csv" target="_blank">
          Download Sample CSV
        </Button>
      </Grid>

      {formState.error && <Alert severity="error">{formState.errorMessage}</Alert>}
      {/* <ExistingUploads /> */}
    </div>
  );
}
