import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function ManageProduct() {
  const product = {
    id: 1,
    name: "Product 1",
    buyPrice: 100,
    sellPrice: 150,
    quantity: 10,
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    addedBy: "John Doe",
  };

  const [name, setName] = useState(product.name);
  const [buyPrice, setBuyPrice] = useState(product.buyPrice);
  const [sellPrice, setSellPrice] = useState(product.sellPrice);
  const [quantity, setQuantity] = useState(product.quantity);

  const isFormChanged =
    name !== product.name ||
    buyPrice !== product.buyPrice ||
    sellPrice !== product.sellPrice ||
    quantity !== product.quantity;

  const doDeleteProduct = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product...");
    }
  };

  const doSaveProduct = () => {
    console.log("Saving product...");
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/products">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Manage Product</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <form className="space-y-6 max-w-4xl mx-auto">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Buy & Sell Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Buy Price</label>
              <input
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Sell Price</label>
              <input
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          {/* Immutable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Added At:</label>
              <input
                type="text"
                readOnly
                value={product.createdAt}
                className="w-full p-3 rounded bg-gray-900 text-gray-400 border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Updated At:</label>
              <input
                type="text"
                readOnly
                value={product.updatedAt}
                className="w-full p-3 rounded bg-gray-900 text-gray-400 border border-gray-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Added By:</label>
              <input
                type="text"
                readOnly
                value={product.addedBy}
                className="w-full p-3 rounded bg-gray-900 text-gray-400 border border-gray-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={doDeleteProduct}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
            >
              Remove Product
            </button>
            <button
              type="button"
              onClick={doSaveProduct}
              disabled={!isFormChanged}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isFormChanged
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
