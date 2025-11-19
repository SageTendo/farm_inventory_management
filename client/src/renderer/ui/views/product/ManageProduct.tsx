import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { trpcClient } from "../../../../shared/trpc/client";
import { ProductDTO } from "../../../../shared/dto/product";
import { Money } from "../../../../lib/money";
import { ConfirmDialog } from "../../components/shared/ConfirmDialog";

// TODO: Do I need to include the details about who added the product?
// TODO: Need user id to be able to delete and update products
// TODO: Handle deletion and updates
export function ManageProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO>(null);
  const [name, setName] = useState<string>("");
  const [buyPrice, setBuyPrice] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(-1);

  const [showDeleteProductDialog, setShowDeleteProductDialog] = useState(false);
  const [showSaveChangesDialog, setShowSaveChangesDialog] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) navigate("404");

      setIsLoading(true);
      await trpcClient.product.getById
        .query({
          id: productId,
        })
        .then((product) => {
          if (!product) navigate("404");
          setProduct(product);
          setIsLoading(false);
        });
    };

    getProduct();
  }, [productId]);

  const isFormChanged = () => {
    return (
      name.trim() !== "" || buyPrice !== 0 || sellPrice !== 0 || quantity !== -1
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-gb", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  const doDeleteProduct = () => {
    console.log("Deleting product...");
  };

  const doSaveProduct = () => {
    console.log("Saving product...", product);
  };

  return isLoading ? (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <div className="flex items-center justify-center h-full">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/products">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Products</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Manage Product</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder={product.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Buy & Sell Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Buy Price (USD)</label>
              <input
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder={Money.fromDollars(product.buyPrice).read}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Sell Price (USD)</label>
              <input
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder={Money.fromDollars(product.sellPrice).read}
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
              placeholder={product.quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          {/* Immutable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Added At:
              </label>
              <input
                type="text"
                readOnly
                value={formatDate(product.createdAt)}
                className="w-full p-3 rounded bg-gray-950 text-gray-400 border border-gray-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">
                Added By:
              </label>
              <input
                type="text"
                readOnly
                value={product.addedBy}
                className="w-full p-3 rounded bg-gray-950 text-gray-400 border border-gray-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => setShowDeleteProductDialog(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
            >
              Remove Product
            </button>
            {showDeleteProductDialog && (
              <ConfirmDialog
                title="Remove Product"
                message="Are you sure you want to remove this product?"
                confirmText="Remove"
                cancelText="Cancel"
                onConfirm={doDeleteProduct}
                onCancel={() => setShowDeleteProductDialog(false)}
              />
            )}
            <button
              type="button"
              onClick={() => setShowSaveChangesDialog(true)}
              disabled={!isFormChanged()}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isFormChanged()
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
            {showSaveChangesDialog && (
              <ConfirmDialog
                title="Save Changes"
                message="Are you sure you want to save these changes?"
                confirmText="Save"
                cancelText="Cancel"
                onConfirm={doSaveProduct}
                onCancel={() => setShowSaveChangesDialog(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
