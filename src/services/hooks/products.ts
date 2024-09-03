import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getProducts,
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
} from "../api";

export const useGetProducts = () => {
  return useQuery("products", getProducts, {
    select: (data) => data.data,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

export const useGetProduct = ({ id }: { id: string }) => {
  return useQuery(`products/${id}`, () => getProduct(id), {
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useEditProduct = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(`products/${id}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};
