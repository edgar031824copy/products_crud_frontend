import { Link, useNavigate } from "react-router-dom";

import { useCreateProduct } from "../../services/hooks";
import { Form } from "../../components/form";
import { Product } from "./schemas";

export const NewProduct = () => {
  const { mutate: createProduct, isLoading, isSuccess } = useCreateProduct();
  const navigate = useNavigate();

  const handleSubmit = (data: Product) => {
    createProduct(data, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <h2 className="text-4xl font-black text-slate-500">Add product</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 text-sm font-bold text-white shadow hover:bg-indigo-500 p-3"
        >
          Go to products
        </Link>
      </div>
      <Form
        onHandleSubmit={handleSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        mode="create"
      />
    </>
  );
};
