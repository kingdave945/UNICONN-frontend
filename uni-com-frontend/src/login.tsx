import './login.css'
import { Link } from 'react-router-dom';
import LoginImage from './assets/b0f745d9-368d-4e8a-b2e0-b936c574a9e4.png';
import { useNavigate } from 'react-router-dom';
import NavBar from './Layout/navbar';
export default function Login() {
  const navigate = useNavigate();
  return (
    <>
    <NavBar />
    <div className="login-container">
        <div className='login-header'>
     <div className='login-img'>
<img src={LoginImage} alt="" />
     </div>
     <div className='login-form'>
        <div className='login-form-header'>
           <h1>
            Welcome Back
        </h1>  
        <p>
            Login to your UniConnect account
        </p>
        </div>
       <form className='login-form-content'>
          <div className='login-input'>
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" placeholder='your email' required />
          </div>
          <div  className='login-input'>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder='your password' required />
          </div>
          <div style={{textAlign:'right' , marginBottom:'50px'}}>
            <p>Forgot Password ? </p>
          </div>
          <button
className='login-btn'
          >
            Login
          </button>
</form>
<div className='login-links'>
<p >
     Dont have an account? <Link to="/register">Register</Link>
     </p>
</div>
</div>
     </div> 
    </div>
    </>
  );
}