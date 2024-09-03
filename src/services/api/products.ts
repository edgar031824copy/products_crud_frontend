import { Product } from "../../pages/products/schemas";
import axiosInstance from "./config";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (product: Product) => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async (product: Product) => {
  try {
    const response = await axiosInstance.put(`products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
