import { instanceAPI } from "./axios";
export const signup = (data) => instanceAPI.post("/auth/signup", data);
export const login = (data) => instanceAPI.post("/auth/login", data);
export const verify = (data) => instanceAPI.post("/auth/verify", data);
export const forgotPasswordApi = (data) => instanceAPI.post("/auth/forgot-password", data);
export const resetPasswordApi = (data) => instanceAPI.post("/auth/reset-password", data);
export const logout = () => instanceAPI.post("/auth/logout");
export const user=()=>instanceAPI.get("/auth/user_details");