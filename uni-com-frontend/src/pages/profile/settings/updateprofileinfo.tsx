// import  { useState } from "react";
export default function ProfileInfo() {
//         const [showPassword, setShowPassword] = useState(false);
// const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };
  return (
    <div className="user-profile-info-card">
      <div className="cp-card">
        <h2>Update Profile Information</h2>
        <p>Update your accounts's information and email address.</p>
      </div>
     <section>
      <div className="cp-input1">
        <div className="my-input-fields">
        <label htmlFor="">Name</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              required
              />
        </div>
        <div className="my-input-fields">
        <label htmlFor="">Email</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              required
              />
        </div>
      
      </div>
      <div className="cp-input1">
        <div className="my-input-fields2">
        <label htmlFor="">Password</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              required
              />
        </div>
        <div className="my-input-fields2">
        <label htmlFor="">Level</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              required
              />
        </div>
      </div>
      <div className="btn-up">
      <button >Save Changes</button>
      </div>
     </section>
    </div>
  );
}