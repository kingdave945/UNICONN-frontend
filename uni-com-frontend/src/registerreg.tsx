import RegisterImage from "./assets/efc8d6e8-84b4-45e5-8404-322950f1088b.png";
export default function RegisterReg() {
  return (
    <div className="form-page">
      <div className="reg-form-container">
        <div>
          <img src={RegisterImage} alt="login" />
        </div>
        
        <div className="register-form">
            <div className="loginlogin-form-header">
            <h1>Welcome Back</h1>
            <p>Login to your UniConnect account</p>
          </div>
        
           <form className="register-form-content">
          <div className="form-group">
            <div>
              <label htmlFor="fullname">Fullname:</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="Email">UserName:</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="Email">Email:</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
          </div>
  <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" required>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </div>
  <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" required>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input id="password-input" required />
              <div style={{ cursor: "pointer" }}></div>
            </div>
          </div>
           <div
                  id="register-select"
                  className="select-display-register"
                >
                  <select
                    id="department"
                    name="department"
                   
                  
                  >
                    {/* <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))} */}
                  </select>

                  <select
                    id="level"
                    name="level"
                  
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

          <div style={{ textAlign: "right", marginBottom: "20px" }}></div>

          {/* <button className="login-btn" disabled={loading}>
                {loading ? <span className="loginloader"></span> : "Login"}
              </button> */}
          <div className="login-links">
            <p>Don’t have an account?</p>
          </div>
        </form>    
        </div>
     
      </div>
    </div>
  );
}
