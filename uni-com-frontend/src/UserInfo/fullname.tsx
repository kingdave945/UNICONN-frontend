
export function GetFullName() {
  const rawUser = sessionStorage.getItem("user");
  if (!rawUser) return "Guest";
  try {
    const userData = JSON.parse(rawUser);
    return userData.data.user.fullName;
  } catch {
    return "Guest";
  }
}

export function GetEmail() {
  const rawUser = sessionStorage.getItem("user");
  if (!rawUser) return "Guest";
  try {
    const userData = JSON.parse(rawUser);
    return userData.data.user.email;
  } catch {
    return "Guest";
  }
}
// const rawUser = sessionStorage.getItem("user");
// const userData = rawUser ? JSON.parse(rawUser) : null;
// const userDate = userData?.data;
// const tokenKey = userData?.data?.token;
// console.log("MY TOKEN KEY:", tokenKey);
// console.log("USER DATA:", userDate);
// console.log("Session Storage for ADMIN:", sessionStorage);
// console.log(" NIGGER:", sessionStorage);
export function GetLevel() {
  const rawUser = sessionStorage.getItem("user");
  if (!rawUser) return "Guest";
  try {
    const userData = rawUser ? JSON.parse(rawUser) : null;
    console.log(userData.data.user.level)
    return userData.data.user.level;
  } catch {
    return "Guest";
  }
}
export function GetDepartment() {
  const rawUser = sessionStorage.getItem("user");
  if (!rawUser) return "Guest";
  try {
    const userData = JSON.parse(rawUser);
    return userData.data.user.department;
  } catch {
    return "Guest";
  }
}