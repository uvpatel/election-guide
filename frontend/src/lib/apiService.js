const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const apiService = {
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API Request Failed");
      }

      return await response.json();
    } catch (error) {
      console.error("[API Service Error]", error);
      throw error;
    }
  },

  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error("API Request Failed");
      return await response.json();
    } catch (error) {
      console.error("[API Service Error]", error);
      throw error;
    }
  }
};
