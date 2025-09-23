import { useState } from "react";
import { toast } from 'react-toastify';
import api from "../API/Interceptor";
import './forgotpswd.css';
export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgetPassword = async (email: string) => {
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
       setLoading(true);
      try {
      await api.post("/api/Auth/forgot-password", {
        email
      });
      toast.success("Your Reset Link has been Sent to your Email");
    }
    catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link.");
    }
       setLoading(false);
  };

  return (
    <>
 
    <div className="forgotpassword-container">
      <div className="forgotpassword">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgetPassword(email);
          }}
        >
      
        <div className='forgot-password-header'>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='login-btn' disabled={loading}>

            {loading ? <span className="loader"></span> : "Send My Reset Link"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
