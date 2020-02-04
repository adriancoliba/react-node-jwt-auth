import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, CssBaseline, Button, Avatar,
  Typography, Container, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from "@material-ui/core";
import style from "./style";
import { Link } from 'react-router-dom';
import globalStyle from "../../utils/globalStyle";
import axios from "axios";

const SignUpPage = ({classes, history}) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if(message === 'successful'){
      setTimeout(() => { history.push('/authenticated') }, 2000)
    }
    return () => { setUser(null) } 
  }, [message]);

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
      setLoading(true);

      axios.post('/getToken', {
        email: user.email, password: user.password
      }).then( res => {
        if(res.data){
          localStorage.setItem('jwt', res.data)
          setLoading(false);
          setMessage('successful')
        }
      }).catch(err => {
        setLoading(false)
        setMessage(err.message)
      })
    }
  };

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
    </Container>
  );
}

export default withStyles((theme) => ({
  ...style(theme),
  ...globalStyle(theme),
}), { withTheme: true })(SignUpPage);
