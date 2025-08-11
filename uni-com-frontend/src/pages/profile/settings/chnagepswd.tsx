export default function ChangePassword(){
    return(
        <>
           <div className="user-profile-info-card">
      <div className="cp-card">
        <h2>Change Password</h2>
        <p>Ensure your account is using a long, random password to stay secure.</p>
      </div>
     <section>
      <div className="Change-passsword">
        <div className="my-input-fields">
        <label htmlFor="">Old Password</label>
        <input
              type="text"
              placeholder="Old Password"
              name="email" 
              required
              />
        </div>
        <div className="my-input-fields">
        <label htmlFor="">New Password</label>
        <input
              type="text"
              placeholder="New Password"
              name="email" 
              required
              />
        </div>
      
        <div className="my-input-fields">
        <label htmlFor="">Confrim New Password</label>
        <input
              type="text"
              placeholder="Confrim New Password"
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
        </>
    )
}