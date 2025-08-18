
import api from "./Interceptor";
import {  saveUserDetails } from "./saveDetails";



interface formData {
  email: string;
  password: string;
}
// interface messageform{
//   propertyId: string;
//   content: string;
//     receiverEmail: string;
// }

interface registerData {
  email: string;
  password: string;
  fullName: string;
  userName: string;
  department: string;
  level: number;
  courseOfStudy: string;
  role: string;
  universityId: number;
}

export const register = async (formData:registerData) => {
  try {
    const response = await api.post(`/api/Auth/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginStudent = async (formData: formData) => {
  try {
    const response = await api.post(`/api/Auth/login-student`, formData);

    if (response.data?.token) {
      sessionStorage.setItem("Ustoken", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    saveUserDetails("notconfirmed", error.response?.data.message);
    throw error;
  }
};

export const loginAdmin = async (formData: formData) => {
  try {
    const response = await api.post(`/api/Auth/login-admin`, formData);

    if (response.data?.token) {
      sessionStorage.setItem("Adtoken", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    saveUserDetails("notconfirmed", error.response?.data.message);
    throw error;
  }
  
};
console.log('Session Storage for STUDENT:', sessionStorage);

export const resendconfirmemail = async (email:string) => {
  try {
    const response = await api.post(`/api/Auth/resend-email-confirmation`,{ email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
console.log('Session Storage for ADMIN:', sessionStorage);
// POST
// /api/Auth/resend-email-confirmation

// export const disableAccount = async (password: string) => {
//   try {
//     const response = await api.delete(`/api/Auth/disable-account`, {
//       data: { password },
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };




export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePicture", file); // must match `[FromForm] IFormFile profilePicture` on backend

  const response = await api.post(`/api/ProfilePicture/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // expected: { filePath: "uploads/profile-pictures/xxx.jpg" }
};



export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(`/api/Auth/forgot-password`, {
      data: { email },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


