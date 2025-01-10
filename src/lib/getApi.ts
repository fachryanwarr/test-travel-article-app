import api from "./api";
import { DANGER_TOAST, showToast } from "./toast";

type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
};

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data: object | null = null
): Promise<ApiResponse<T>> => {
    
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
    });

    return {
      isSuccess: true,
      data: response.data.data as T,
    };
  } catch (error) {
    console.error("Error in API request:", error);
    showToast(error as string, DANGER_TOAST)
    return {
      isSuccess: false,
      data: null,
    };
  }
};

export default request;
