import { Link } from "react-router-dom";
import "./register.css";
import NavBar from "./Layout/navbar";
import RegisterImage from "./assets/efc8d6e8-84b4-45e5-8404-322950f1088b.png";
export default function Register() {
  return (
    <>
      <NavBar />
    <div className="register-container">
      <div className="register-header">
        <div className="register-img">
          <img src={RegisterImage} alt="" />
        </div>
        <div className="register-form">
          <div className="register-form-header">
            <h1>
              Create Your <br /> UniConnect Account
            </h1>
            <p>
              Join UniConnect to access a wealth of <br /> academic resources
            </p>
          </div>
          <form className="register-form-content">
            <div className="register-input">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="your full name"
                required
              />
            </div>
            <div className="register-input">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="your email"
                required
              />
            </div>
            <div className="register-input">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="your password"
                required
              />
            </div>
            <div className="register-input">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="confirm your password"
                required
              />
            </div>
            <div className="user-info">
              <div>
                <div>
                  <label htmlFor="Department">Department</label>
                </div>

                <select id="Department" name="Department" required>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
              <div>
                <div>
                  <label htmlFor="Level">Level</label>
                </div>

                <select id="Level" name="Level" required>
                  <option value="">Select Level</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
            </div>
            <button className="register-btn">Sign Up</button>
          </form>
          <div className='login-links'>
<p >
     Already have an account? <Link to="/login">Login</Link>
     </p>
</div>
        </div>
      </div>
    </div>
    </>
  );
}
