const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/auth";

/**
 * Hàm gọi API chung tự động gắn Authorization Header và xử lý JSON Response / Error
 */
export async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    const error = new Error((data && data.message) || "Có lỗi xảy ra khi gọi API");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const http = {
  get: (url, options = {}) => request(url, { method: "GET", ...options }),
  post: (url, body, options = {}) =>
    request(url, { method: "POST", body: JSON.stringify(body), ...options }),
  put: (url, body, options = {}) =>
    request(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  delete: (url, options = {}) => request(url, { method: "DELETE", ...options }),
};

export default http;
