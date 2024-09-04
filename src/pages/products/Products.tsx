import { Link, useNavigate } from "react-router-dom";
import { useDeleteProduct, useGetProducts } from "../../services/hooks";
import { Product } from "./schemas";
import { Spinner } from "../../components/spinner";

export const Products = () => {
  const { data, isLoading } = useGetProducts();
  const { mutate: deleteProduct, isLoading: isMutating } = useDeleteProduct();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>
        <Link
          to="products/new"
          className="rounded-md bg-indigo-600 text-sm font-bold text-white shadow hover:bg-indigo-500 p-3"
        >
          Add product
        </Link>
      </div>
      <div className="relative overflow-x-auto mt-10">
        {isLoading || isMutating ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: Product & { id: string }) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.id}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </td>
                  <td className="px-6 py-4">
                    {item.availability ? "Available" : "Not available"}
                  </td>
                  <td className="px-6 py-4">
                    <div className=" flex gap-4">
                      <button onClick={() => navigate(`/products/${item.id}`)}>
                        <i className="fa-solid fa-pen-to-square" />
                      </button>
                      <button onClick={() => deleteProduct(item.id)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
