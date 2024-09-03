import { Link, useNavigate, useParams } from "react-router-dom";

import { useEditProduct, useGetProduct } from "../../services/hooks";
import { Form } from "../../components/form";
import { Product } from "./schemas";
import { Spinner } from "../../components/spinner";

export const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    mutate: editProduct,
    isLoading: isUpdating,
    isSuccess,
  } = useEditProduct({ id: id! });
  const { data: productData, isLoading } = useGetProduct({ id: id! });

  const handleSubmit = (data: Product) => {
    console.log(data);

    if (data) {
      editProduct(
        { ...data, id: productData.id },
        {
          onSuccess: () => navigate("/"),
        }
      );
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit product</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 text-sm font-bold text-white shadow hover:bg-indigo-500 p-3"
        >
          Go to products
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Form
          onHandleSubmit={handleSubmit}
          isLoading={isUpdating}
          isSuccess={isSuccess}
          mode="edit"
          defaultValues={{
            name: productData.name,
            price: productData.price,
            availability: !!productData.availability,
          }}
        />
      )}
    </>
  );
};
