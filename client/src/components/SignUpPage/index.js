import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, CssBaseline, Button, Avatar,
  Typography, Container, Grid, Checkbox, FormControlLabel, Backdrop, Modal, Fade } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from "@material-ui/core";
import style from "./style";
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import globalStyle from "../../utils/globalStyle";

const SignUpPage = ({classes}) => {
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
      if(setMessage === 'successful') setTimeout(() => { setOpenModal(true);
      setUser(null);
    }, 500)
  }, [message]);

  useEffect(() => { return () => { setUser(null) } }, []);

  const handleChangeUser = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  };

  const onSignUp = () => {
    if (user == null || user.email == null || user.password == null) {
      return setMessage('Complete all fields.')
    } else {
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      const { email, password } = user
      if(!regex.test(email)) return setMessage('Email badly formatted')
      if(password.length < 6) return setMessage('Password too short')

      // make a call to backend
    }
  };

  const handleCloseModal = () => { setOpenModal(true) }

  return (
    <Container component="main" maxWidth="xs" className={classes.containerAuth}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h2">
          Sign up
        </Typography>
        <Typography variant="h3" className={message === 'successful' ? classes.registerMessageGreen : classes.registerMessageRed}>
          {message && message} &nbsp;
        </Typography>
        
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                value={ (user && user.email) ? user.email : ''}
                onChange={handleChangeUser}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={ (user && user.password) ? user.password : ''}
                onChange={handleChangeUser}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="h3" className={classes.decorationTransformNone}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {loading && <CircularProgress/>}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paperModal}>
            <Avatar className={classes.avatar}>
              <CheckCircleOutlineIcon />
            </Avatar>
            <br/>
            <Typography variant="h2" id="transition-modal-title">Successfully signed up</Typography>
            <br/><br/>
            <Link to={'/signin'} className={classes.textDecorationNone}>
              <Button variant={'outlined'} className={classes.buttonSignIn}>Sign In</Button>
            </Link>
          </div>
        </Fade>
      </Modal>

    </Container>
  );
}

export default withStyles((theme) => ({
  ...style(theme),
  ...globalStyle(theme),
}), { withTheme: true })(SignUpPage);
