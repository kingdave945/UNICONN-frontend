;
import api from "./Interceptor";
import { saveUserDetails } from "./saveDetails";
interface formData {
  email: string;
  password: string;
}
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
interface uploadMaterials {
  title: string;
  course: string;
  description: string;
  file: File;
  level: string;
  Tags: string[];
}
interface ResetPassword{
  oldPassword: string;
  newPassword: string;
  email: string;
}
const rawUser = sessionStorage.getItem("user");
const userData = rawUser ? JSON.parse(rawUser) : null;
const userDate = userData?.data;
const tokenKey = userData?.data?.token;
console.log("MY TOKEN KEY:", tokenKey);
console.log("USER DATA:", userDate);
console.log("Session Storage for ADMIN:", sessionStorage);
console.log(" NIGGER:", sessionStorage);
export const register = async (formData: registerData) => {
  try {
    console.log("Payload being sent:", formData);
    const response = await api.post(`/api/Auth/register`, formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error:", error.response.data);

      if (error.response.data.data && Array.isArray(error.response.data.data)) {
        error.response.data.data.forEach((err: any, index: number) => {
          console.error(`Validation issue ${index + 1}:`, err);
        });
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
export const uploadMaterials = async (uploadMat: uploadMaterials) => {
  try {
    console.log("StudMat:", uploadMat);

    const formData = new FormData();
    formData.append("title", uploadMat.title);
    formData.append("course", uploadMat.course);
    formData.append("description", uploadMat.description);
    formData.append("file", uploadMat.file);
    formData.append("level", uploadMat.level);
    uploadMat.Tags.forEach((tag: string) => formData.append("Tags", tag));

    const response = await api.post(`/api/StudyMaterials/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokenKey}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Backend error:", error.response.data);
      if (error.response.data.data && Array.isArray(error.response.data.data)) {
        error.response.data.data.forEach((err: any, index: number) => {
          console.error(`Validation issue ${index + 1}:`, err);
        });
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const loginUser = async (role: string, form: formData) => {
  try {
    const response = await api.post(`/api/Auth/login/${role}`, form);

    if (response.data?.token) {
      sessionStorage.setItem("Ustoken", response.data.token);
      console.log("Session Storage for ADMIN:", sessionStorage);
    }
    console.log("Response data:", response.data);
    saveUserDetails("user", response.data);
    console.log("Saved user data:", response.data);
    return response.data;
  } catch (error: any) {
    saveUserDetails("notconfirmed", error.response?.data?.message);
    throw error;
  }
};


export const resendconfirmemail = async (email: string) => {
  try {
    const response = await api.post(`/api/Auth/resend-email-confirmation`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(`/api/Auth/forgot-password`, {
      data: { email },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteMaterial = async (materialId: number) => {
  try {
    const response = await api.delete(
      `/api/StudyMaterials/${materialId}`
    );
    console.log("Deleted Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to delete material:", error.response?.data || error.message);
    throw error;
  }
};
export const downloadMaterial = async (materialId: number) => {
  try {
    const response = await api.get(
      `/api/StudyMaterials/download/${materialId}`,
      { responseType: "blob" } // 👈 handle file
    );

    // Create a downloadable link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // If your API sends filename in headers, use it; otherwise use fallback
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "material";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("✅ Downloaded Successfully");
  } catch (error: any) {
    console.error("❌ Failed to download material:", error.response?.data || error.message);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get(
      `/api/Admin/users`
    );
    console.log("users:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to get users:", error.response?.data || error.message);
    throw error;
  }
};

export const disableAccount = async (password: string) => {
  try {
    const response = await api.delete(`/api/Auth/disable-account`, {
      data: { password },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetPassword = async (data: ResetPassword) => {
  try {
    const response = await api.post(`/api/Auth/reset-password`, 
      data);
    console.log("Reset Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
