export const saveUserDetails = (name: string, data: any): void => {
  if (typeof window !== "undefined") {
    try {
      const jsonData = JSON.stringify(data);
      sessionStorage.setItem(name, jsonData);
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  }
};

export const getUserDetails = (name: string) => {
  if (typeof window !== "undefined") {
    try {
      const jsonData = sessionStorage.getItem(name);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error("Error retrieving user details from localStorage:", error);
      return null;
    }
  }
};
