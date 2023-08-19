"use client";
import axios from "axios";

const apiClient = axios.create({
  //baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  baseURL: "https://auditalk.hop.sh/api",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-auth-token");
    const email = localStorage.getItem("x-auth-email");
    if (token) {
      config.headers["x-auth-token"] = token;
      config.headers["x-auth-email"] = email;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (data) => {
  const response = await apiClient.post("/user", {
    ...data,
  });
  return response;
};

export const login = async (data) => {
  const response = await apiClient.post("/user/login", {
    ...data,
  });
  return response;
};

export const getUser = async () => {
  const response = await apiClient.get(`/user`);
  return response;
};
export const getUsers = async () => {
  const response = await apiClient.get(`/user/all`);
  return response;
};
export const updateUser = async (body) => {
  const response = await apiClient.put(`/user`, { ...body });
  return response;
};
export const join = async (body) => {
  const response = await apiClient.post(`/join`, { ...body });
  return response;
};

export const getJoin = async () => {
  const response = await apiClient.get(`/join`);
  return response;
};

export const addSession = async (body) => {
  const response = await apiClient.post(`/user/enroll`, { ...body });
  return response;
};

export const verifyPayment = async (body) => {
  const response = await apiClient.post(`/user/verify`, { ...body });
  console.log(response, 12);
  return response;
};

export const createOrderId = async (body) => {
  const response = await apiClient.post(`/user/create/orderId`, { ...body });
  return response;
};
