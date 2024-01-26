import classes from './ProfileForm.module.css';
import { useRef ,useContext} from 'react';
import AuthContext from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const authctx=useContext(AuthContext)
  const Navigate=useNavigate();

  const newPasswordInputRef=useRef();
  const submitHandler=event=>{
    event.preventDefault();

    const enteredNewPassword=newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBc3YZgbBGnV87OYpv0Cs5CthEHXIvfDtg"
    ,{
      method:'POST',
      body:JSON.stringify({
        idToken:authctx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      header:{
        'Content-type':'application/json'
      }
    }).then(res=>{
        // newPasswordInputRef.current.value = "";

        Navigate('/')
      
    });

  }
  return (
   
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
