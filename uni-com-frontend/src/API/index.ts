import api from "./Interceptor";
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
interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
interface ResetPassword {
  email: string;
  token: string;
  newPassword: string;
}
interface SuggestedMaterials {
  level: string;
  pageNumber?: number;
  pageSize?: number;
}

const rawUser = sessionStorage.getItem("user");
const userData = rawUser ? JSON.parse(rawUser) : null;
const userDate = userData?.data;
console.log("USERDATA:", userDate);

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

    const response = await api.post(`/api/StudyMaterials/upload`, formData);

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

    // ✅ Check if backend returned the token inside response.data.data
    const token = response.data?.data?.token;
    const user = response.data?.data?.user;

    if (token) {
      // Save only what you need, clean structure
      const sessionData = { token, user };
      sessionStorage.setItem("user", JSON.stringify(sessionData));

      console.log("✅ User logged in. Session storage updated:", sessionData);
    } else {
      console.warn("⚠️ Login succeeded but no token found in response");
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ Login error:", error.response?.data || error.message);
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
    const response = await api.delete(`/api/StudyMaterials/${materialId}`);
    console.log("Deleted Successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Failed to delete material:",
      error.response?.data || error.message
    );
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
    console.error(
      "❌ Failed to download material:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get(`/api/Admin/users`);
    console.log("users:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Failed to get users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const disableAccount = async (password: string) => {
  try {
    const response = await api.delete(`/api/Auth/disable-account`, {
      data: { password },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const changePassword = async (data: ChangePassword) => {
//   try {
//     // Get token from sessionStorage
//     const token = sessionStorage.getItem("token");
//   console.log('CHANGEPASSWORD:', token)
//     const response = await axios.post(
//       "https://yimikadavid-001-site1.mtempurl.com/api/Auth/change-password",
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach token
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Change Password Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Change Password Error:", error);
//     throw error;
//   }
// };
export const changePassword = async (data: ChangePassword) => {
  try {
    const response = await api.post(`/api/Auth/change-password`, data);
    console.log("✅ Change Password Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Change Password Error:", error);
    throw error;
  }
};
export const resetPassword = async (data: ResetPassword) => {
  try {
    const response = await api.post(`/api/Auth/reset-password`, data);
    console.log("Reset Password Response:", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getSuggestedMaterials = async (params: SuggestedMaterials) => {
  try {
    const response = await api.get(
      `/api/StudyMaterials/by-level/${params.level}`,
      {
        params: {
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 10,
        },
      }
    );
    return response.data.data.data || [];
  } catch (error: any) {
    console.error(
      "❌ Failed to get study materials:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getSuggestedMaterialsResult = async (params: SuggestedMaterials) => {
  try {
    const response = await api.get(
      `/api/StudyMaterials/by-level/${params.level}`,
      {
        params: {
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 10,
        },
      }
    );
console.log('PARAMS',params)
    return {
      items: response.data.data.data || [],
      totalItems: response.data.data.totalItems || 0,
    };
  } catch (error: any) {
    console.error(
      "❌ Failed to get study materials:",
      error.response?.data || error.message
    );
    throw error;
  }
};

