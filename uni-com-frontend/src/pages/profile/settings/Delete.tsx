import { disableAccount } from "../../../API"
import { toast } from "react-toastify";
export default function Delete(){
  const handleDisableAccount = async () => {
  const confirmDelete = window.confirm("You are about to disbale your account permanently. Do you wish to continue?");
  if (!confirmDelete) return;

  const password = prompt("Enter your password to confirm action:") ?? "";
  if (!password) {
    toast.error("Password is required.");
    return;
  }

  try {
    await disableAccount(password);
    toast.success("Account disabled successfully.");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete account.");
    console.error("Delete error:", error);
  }
};
    return(
        <>
          <div className="delete-user-profile-info-card">
      <div className="Delete-card">
        <h2>Delete Account</h2>
        <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
      </div>
   <div className="delete-btn">
      <button onClick={handleDisableAccount}>
            Delete Account
      </button>
   </div>
    </div>
        </>
    )
}