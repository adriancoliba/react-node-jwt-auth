import React, {useState, useEffect} from 'react';

const AuthenticatedComponent = props => {
  useEffect(() => {
    console.log('authenticated')
  }, [])

  if(!props.user) return <div></div>;

  return <div>
    user: {props.user.email}
    <br/>
    id: {props.user.id}
  </div>
}

export default AuthenticatedComponent;