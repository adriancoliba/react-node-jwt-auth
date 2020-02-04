import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AuthenticatedComponent = ({history}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) return history.push('/signup')

    axios.get('/getUser', {headers: { Authorization: `Bearer ${jwt}` }})
      .then( res => {setUser(res.data)})
      .catch( err => {
        console.log(err.message)
        localStorage.removeItem('jwt');
        history.push('/signup')
      })
  }, [])

  user && console.log(user)

  return (
    <div>
      This is the authenticated page
    </div>
  )
}

export default AuthenticatedComponent;