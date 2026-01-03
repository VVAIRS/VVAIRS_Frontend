import { instanceAPI } from "./axios";
export const signup = (data) => instanceAPI.post("/auth/signup", data);
export const login = (data) => instanceAPI.post("/auth/login", data);
export const verify = (data) => instanceAPI.post("/auth/verify", data);