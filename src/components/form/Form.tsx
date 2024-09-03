import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { Form as ReactForm } from "react-router-dom";
import { Product, validateData } from "../../pages/products/schemas";
import { Spinner } from "../spinner";

type Props = {
  onHandleSubmit: (_data: Product) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
} & (
  | {
      mode: "create";
      defaultValues?: never;
    }
  | {
      mode: "edit";
      defaultValues: Product;
    }
);

export const Form: FC<Props> = ({
  onHandleSubmit,
  isLoading,
  isSuccess,
  defaultValues,
  mode,
}) => {
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});
  const [formValues, setFormValues] = useState<{
    name: string;
    price: number;
    availability: boolean;
  }>({
    name: defaultValues?.name ?? "",
    price: defaultValues?.price ?? 0,
    availability: !!defaultValues?.availability,
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = {
      name: formValues.name ?? "",
      price: Number(formValues.price) ?? 0,
      availability: formValues.availability,
    };

    const result = validateData(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setErrors({
        name: errors.name?.[0],
        price: errors.price?.[0],
      });
      return;
    }

    setErrors({});

    onHandleSubmit(result.data);
  };

  const handleClick = (e: React.ChangeEvent) => {
    let { name, value, checked } = e.target as HTMLInputElement;

    setFormValues({
      ...formValues,
      [name]: name === "availability" ? checked : value,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormValues({ name: "", price: 0, availability: false });
    }
  }, [isSuccess]);

  return (
    <ReactForm onSubmit={handleSubmit}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            id="name"
            onChange={handleClick}
            className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        <div className="sm:col-span-5">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price:
          </label>
          <input
            min={0}
            type="number"
            name="price"
            id="price"
            onChange={handleClick}
            value={formValues.price}
            className="block w-full mt-2 qrounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.price && (
            <p className="text-sm text-red-600 mt-1">{errors.price}</p>
          )}
        </div>
        <div className="sm:col-span-5">
          <input
            checked={formValues.availability}
            id="availability"
            type="checkbox"
            name="availability"
            onChange={handleClick}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="availability"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Availability
          </label>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="sm:col-span-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <div className="flex items-center justify-center gap-4">
            {isLoading && <Spinner />}
            {mode === "edit" ? "Edit" : "Add"}
          </div>
        </button>
      </div>
    </ReactForm>
  );
};
