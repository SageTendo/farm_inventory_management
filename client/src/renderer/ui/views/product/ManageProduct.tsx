import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { trpcClient } from "../../../../shared/trpc/client";
import { ProductDTO } from "../../../../shared/dto/product";
import { ConfirmDialog } from "../../components/shared/ConfirmDialog";
import { Spinner } from "../../components/shared/Spinner";
import { useAuth } from "../../../context/AuthProvider";
import toast from "react-hot-toast";

export function ManageProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDTO | null>(null);

  const [name, setName] = useState<string | null>(null);
  const [buyPrice, setBuyPrice] = useState<string | null>(null);
  const [sellPrice, setSellPrice] = useState<string | null>(null);

  const [showDeleteProductDialog, setShowDeleteProductDialog] = useState(false);
  const [showSaveChangesDialog, setShowSaveChangesDialog] = useState(false);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    if (!productId) return navigate("404");

    try {
      const fetchedProduct = await trpcClient.product.getById.query({
        id: productId,
      });
      if (!fetchedProduct) return navigate("404");

      setProduct(fetchedProduct);
      setName(fetchedProduct.name);
      // Pre-format the initial numbers to 2 decimal places
      setBuyPrice(fetchedProduct.buyPrice.toFixed(2));
      setSellPrice(fetchedProduct.sellPrice.toFixed(2));
    } catch (err) {
      toast.error("Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Formats the string to 2 decimal places when the user clicks away.
   * e.g., "1" becomes "1.00", "1.5" becomes "1.50"
   */
  const handlePriceBlur = (
    value: string | null,
    setter: (v: string) => void,
  ) => {
    if (value !== null && value !== "") {
      const numeric = parseFloat(value);
      if (!isNaN(numeric)) {
        setter(numeric.toFixed(2));
      }
    }
  };

  const isFormChanged = () => {
    const hasNameChanged = name !== null && name !== product?.name;
    const hasBuyChanged =
      buyPrice !== null && parseFloat(buyPrice) !== product?.buyPrice;
    const hasSellChanged =
      sellPrice !== null && parseFloat(sellPrice) !== product?.sellPrice;

    return hasNameChanged || hasBuyChanged || hasSellChanged;
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
    if (!user) return logout();
    if (!productId) return toast.error("Product ID missing");

    trpcClient.product.delete
      .mutate({ userId: user.id, id: productId })
      .then(() => {
        toast.success("Product deleted successfully!");
        navigate("/products");
      })
      .catch((err) => toast.error(err.message));
  };

  const doSaveProduct = async () => {
    if (!productId || !user) return;

    if (name && name.trim().length === 0)
      return toast.error("Name cannot be empty!");
    const finalBuy = buyPrice ? parseFloat(buyPrice) : product?.buyPrice;
    const finalSell = sellPrice ? parseFloat(sellPrice) : product?.sellPrice;

    if (finalBuy !== undefined && finalBuy <= 0)
      return toast.error("Buy price must be > 0");
    if (finalSell !== undefined && finalSell <= 0)
      return toast.error("Sell price must be > 0");

    await trpcClient.product.update
      .mutate({
        userId: user.id,
        id: productId,
        entity: {
          name: name?.trim() ?? product?.name,
          buyPrice: finalBuy,
          sellPrice: finalSell,
        },
      })
      .then(() => {
        toast.success("Product saved successfully!");
        setShowSaveChangesDialog(false);
        getProduct(); // Refresh data
      })
      .catch((err) => toast.error(err.message));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
        <Link to="/products">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Products</span>
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold">Manage Product</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              value={name ?? ""}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Buy & Sell Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Buy Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={buyPrice ?? ""}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                onChange={(e) => setBuyPrice(e.target.value)}
                onBlur={() => handlePriceBlur(buyPrice, setBuyPrice)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Sell Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={sellPrice ?? ""}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                onChange={(e) => setSellPrice(e.target.value)}
                onBlur={() => handlePriceBlur(sellPrice, setSellPrice)}
              />
            </div>
          </div>

          {/* Read-only Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Added At:
              </label>
              <input
                readOnly
                type="text"
                value={product ? formatDate(product.createdAt) : ""}
                className="w-full p-3 rounded bg-gray-950 text-gray-500 border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Added By:
              </label>
              <input
                readOnly
                type="text"
                value={product?.addedBy ?? ""}
                className="w-full p-3 rounded bg-gray-950 text-gray-500 border border-gray-700"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => setShowDeleteProductDialog(true)}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition"
            >
              Remove Product
            </button>
            <button
              onClick={() => setShowSaveChangesDialog(true)}
              disabled={!isFormChanged()}
              className={`w-full py-3 rounded-lg font-bold transition ${isFormChanged() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showDeleteProductDialog && (
        <ConfirmDialog
          title="Remove Product"
          message="Permanent action. Continue?"
          onConfirm={doDeleteProduct}
          onCancel={() => setShowDeleteProductDialog(false)}
          confirmText={"Delete"}
          cancelText={"Cancel"}
        />
      )}
      {showSaveChangesDialog && (
        <ConfirmDialog
          title="Save Changes"
          message="Update product details?"
          onConfirm={doSaveProduct}
          onCancel={() => setShowSaveChangesDialog(false)}
          confirmText={"Save"}
          cancelText={"Cancel"}
        />
      )}
    </div>
  );
}
