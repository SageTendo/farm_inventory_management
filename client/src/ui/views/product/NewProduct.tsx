import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function NewProduct() {
  const [product, setProduct] = useState({
    name: "",
    buyPrice: 0,
    sellPrice: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "name" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(product);
    // TODO: toast or mutation logic
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/products">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Cancel</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Add Product</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name..."
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Buy Price</label>
              <input
                type="number"
                name="buyPrice"
                value={product.buyPrice}
                onChange={handleChange}
                required
                placeholder="Enter buy price..."
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Sell Price</label>
              <input
                type="number"
                name="sellPrice"
                value={product.sellPrice}
                onChange={handleChange}
                required
                placeholder="Enter sell price..."
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity..."
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
