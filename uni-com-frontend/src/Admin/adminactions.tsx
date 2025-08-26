 import api from "../API/Interceptor";
 import {toast} from 'react-toastify'
 interface AdminActionProps {
    user: {
      id: number;
      email: string;
      fullName: string;
    };
  }
export default function AdminActions({ user }: AdminActionProps) {
const warn = async() =>{
try{
const response = await api.post(`/api/Admin/users/warn`, {
search: user.email,
message: "This is a warning message"
});
console.log("Warn Response:", response.data);
toast.success('User Warned Successfully');
return response.data;
} catch (error) {
  toast.error('Error warning user');
console.error("Error warning user:", error);
}
}
const suspend = async() =>{
try{
const response = await api.post(`/api/Admin/users/suspend`, {
search: user.email,
days: 10,
reason: "Due to your recent post"
});
console.log("Suspend Response:", response.data);
toast.success('User Suspended Successfully');
return response.data;
} catch (error) {
  toast.error('Error suspending user');
console.error("Error suspending user:", error);
}
}
const ban = async() =>{
try{
const response = await api.post(`/api/Admin/users/ban`, {
search: user.email,
reason: "You've been banned!!"
});
console.log("Ban Response:", response.data);
toast.success('User Banned Successfully');
return response.data;
} catch (error) {
toast.error('Error banning user');
console.error("Error banning user:", error);
}
}
  return (
    <>
      <div className="admin-action-features" style={{ fontSize: "14px" }}>
        <div className="features-admin" onClick={warn} title="warn">
     <i className="bi bi-exclamation-triangle"></i>
        </div>
        <div className="features-admin" onClick={suspend} title="suspend">
          <i className="bi bi-stop-fill"></i>
          
        </div>
        <div className="features-admin" onClick={ban} title="ban">
           <i className="bi bi-ban"></i>
      
        </div>
      </div>
    </>
  );
}
