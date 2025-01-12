import api from "./api";
import { getToken } from "./cookies";
import { DANGER_TOAST, showToast } from "./toast";

type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
};

type SendRequestParams = {
  [key: string]: string | number;
};

const sendRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data: object | null = null,
  params: SendRequestParams = {}
): Promise<ApiResponse<T>> => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (
    token &&
    endpoint !== "/auth/local" &&
    endpoint !== "/auth/local/register"
  ) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      headers,
      params: filteredParams,
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
