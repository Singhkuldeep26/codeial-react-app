import { useState } from 'react';
import styles from '../styles/login.module.css';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useAuth} from '../hooks';


const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loggingIn,setLoggingIn]=useState(false);
    const auth = useAuth();
    console.log(auth);

    const handleSubmit= async (e) => {
        e.preventDefault();
        setLoggingIn(true);

        if(!email || !password){
            return toast.error('Please enter both email and password',{
                autoClose:true,
                position:'top-left',
                theme:'colored'
            })
        }
        const response=await auth.login(email,password);
        
        if(response.success){
            toast.success('Successfully logged in',{
                autoClose:true,
                position:'top-right',
            });
        }else{
            toast.error(response.message,{
                autoClose:true,
                position:'top-right',
            });
        }
        setLoggingIn(false);
    }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input 
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>{loggingIn ? 'Logging in ...':'Log In'}</button>
      </div>
    </form>
  );
};

export default Login;
