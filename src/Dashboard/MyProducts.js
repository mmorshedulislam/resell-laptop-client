import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";
import { json } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(
        `${process.env.REACT_APP_PORT}/myproduct?email=${user?.email}`
      ).then((res) => res.json()),
  });

  const handleStatusSold = (id) => {
    const agree = window.confirm(
      "Are you sure want to The Product Available to Sold?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/productsold/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully status changed");
            refetch();
          }
        });
    }
  };

  const handleStatusAvailable = (id) => {
    const agree = window.confirm(
      "Are you sure want to The Product Available to Sold?"
    );
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/productavailable/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully status changed");
            refetch();
          }
        });
    }
  };

  const handleDelete = (id) => {
    const agree = window.confirm("Want to Delete The Product?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/myproduct/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
          }
        });
    }
  };

  const handleAdsProduct = (product) => {
    const id = product._id;

    const agree = window.confirm("Boost the Product?");
    if (agree) {
      fetch(`${process.env.REACT_APP_PORT}/products/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount || data.modifiedCount) {
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-center text-4xl my-5">
        My Products: {products?.length}
      </h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="py-3 px-6">
                Product
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Advertised
              </th>
              <th scope="col" className="py-3 px-6">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4 w-32">
                  <img
                    className="rounded-full w-full"
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.name} <br />
                  <span className="uppercase">Brand: {product.brand}</span>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  ${product?.currentPrice}
                </td>
                <td className=" py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-center">
                      {product.status === "sold" ? "Sold" : "Available"}
                    </span>
                    <div>
                      {product.status === "sold" ? (
                        <button
                          onClick={() => handleStatusAvailable(product._id)}
                          className="btn btn-xs mt-1"
                        >
                          Available
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusSold(product._id)}
                          className="btn btn-xs mt-1"
                        >
                          Sold
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.ads ? (
                    <span className="">Boosted</span>
                  ) : (
                    <button
                      onClick={() => handleAdsProduct(product)}
                      className={`py-1 px-2 bg-green-500 text-white rounded-md`}
                      disabled={product.ads}
                    >
                      Ads
                    </button>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button onClick={() => handleDelete(product._id)}>
                    <SlClose className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
