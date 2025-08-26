import { useNavigate } from "react-router-dom";
export const roleGetter = async () => {
  const rawUser = sessionStorage.getItem("user");
  if (rawUser) {
    const userObj = JSON.parse(rawUser);

    // check if it's already parsed
    const innerUser = userObj.user ? JSON.parse(userObj.user) : userObj;

    if (innerUser.data?.user?.roles?.includes("Admin")) {
      console.log("✅ Logged in as Admin");
      return "Admin";
    }
    return innerUser.data?.user?.roles?.[0] || null;
  }
  return null;
};



export const useAuth = () => {
  const navigate = useNavigate(); // ✅ now inside a hook

  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return { logOut };
};
