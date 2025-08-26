import { GetFullName, GetEmail, GetLevel} from "../../../UserInfo/fullname";
// import { useEffect, } from "react";
export default function ProfileInfo() {
const fullName = GetFullName();
const email = GetEmail();
const level = GetLevel();

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
              value={fullName}
              disabled
              required
              />
        </div>
           <div className="my-input-fields">
        <label htmlFor="">Level</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              value={level}
              required
              />
        </div>
    
      
      </div>
      <div className="cp-input1">
         <div className="my-input-fields2">
        <label htmlFor="">Email</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              value={email}
              disabled
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
