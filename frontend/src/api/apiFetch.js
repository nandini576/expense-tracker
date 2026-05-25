const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://expense-tracker2-x75d.onrender.com/api"
).replace(/\/$/, "");

export const apiFetch = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("token");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || data.msg || "Something went wrong");
  }

  return data;
};
