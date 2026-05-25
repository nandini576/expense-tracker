const BASE_URL = "https://expense-tracker2-x75d.onrender.com";

export const apiFetch = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
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
