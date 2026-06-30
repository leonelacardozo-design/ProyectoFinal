import api from "../axiosConfig";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export const fetchProducts = () => api.get("/products");
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.patch(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
