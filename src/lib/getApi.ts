import api from "./api";
import { getToken } from "./cookies";
import { DANGER_TOAST, showToast } from "./toast";

type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
};

const sendRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data: object | null = null
): Promise<ApiResponse<T>> => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token && endpoint !== "/auth/local" && endpoint !== "/auth/local/register") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      headers,
    });

    return {
      isSuccess: true,
      data: response.data as T,
    };
  } catch (error) {
    console.error("Error in API request:", error);
    showToast(error as string, DANGER_TOAST);
    return {
      isSuccess: false,
      data: null,
    };
  }
};

export default sendRequest;
