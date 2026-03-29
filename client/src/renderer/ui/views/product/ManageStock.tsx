import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { trpcClient } from "../../../../shared/trpc/client";
import { ProductDTO } from "../../../../shared/dto/product";
import { StockDTO } from "../../../../shared/dto/stock";
import { Spinner } from "../../components/shared/Spinner";
import { useAuth } from "../../../context/AuthProvider";
import toast from "react-hot-toast";

const STOCK_STEP = 1;

export function ManageStock() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { user, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [stock, setStock] = useState<StockDTO | null>(null);

  const [quantityInput, setQuantityInput] = useState("");
  const [thresholdInput, setThresholdInput] = useState("");

  const canEditStock =
    user?.role === "ADMIN" || user?.role === "OWNER";

  const loadData = useCallback(async () => {
    if (!productId) return;
    try {
      const [fetchedProduct, fetchedStock] = await Promise.all([
        trpcClient.product.getById.query({ id: productId }),
        trpcClient.stock.getByProductId.query({ productId }),
      ]);
      if (!fetchedProduct) {
        toast.error("Product not found");
        navigate("/products");
        return;
      }
      setProduct(fetchedProduct);
      setStock(fetchedStock);
      if (fetchedStock) {
        setQuantityInput(String(fetchedStock.quantity));
        setThresholdInput(String(fetchedStock.lowStockThreshold));
      }
    } catch {
      toast.error("Failed to load stock");
    } finally {
      setIsLoading(false);
    }
  }, [productId, navigate]);

  useEffect(() => {
    if (!productId) {
      navigate("/products");
      return;
    }
    loadData();
  }, [productId, navigate, loadData]);

  const applyQuantity = async (nextQuantity: number) => {
    if (!user) return logout();
    if (!stock) return toast.error("No stock record for this product");
    if (nextQuantity < 0) return toast.error("Quantity cannot be negative");

    try {
      const updated = await trpcClient.stock.setQuantity.mutate({
        userId: user.id,
        stockId: stock.id,
        entity: { quantity: nextQuantity },
      });
      if (updated) {
        setStock(updated);
        setQuantityInput(String(updated.quantity));
        toast.success("Quantity updated");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
    }
  };

  const handleStep = (delta: number) => {
    if (!canEditStock) {
      toast.error("You do not have permission to change stock");
      return;
    }
    const current = stock?.quantity ?? 0;
    void applyQuantity(current + delta * STOCK_STEP);
  };

  const handleQuantityBlur = () => {
    if (!canEditStock) return;
    const parsed = parseInt(quantityInput, 10);
    if (Number.isNaN(parsed)) {
      if (stock) setQuantityInput(String(stock.quantity));
      return;
    }
    void applyQuantity(parsed);
  };

  const handleSaveThreshold = () => {
    if (!user) return logout();
    if (!canEditStock) {
      toast.error("You do not have permission to change the threshold");
      return;
    }
    if (!stock) return toast.error("No stock record for this product");

    const parsed = parseInt(thresholdInput, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      toast.error("Threshold must be a non-negative number");
      return;
    }

    trpcClient.stock.setThreshold
      .mutate({
        userId: user.id,
        stockId: stock.id,
        entity: { lowStockThreshold: parsed },
      })
      .then((updated) => {
        if (updated) {
          setStock(updated);
          setThresholdInput(String(updated.lowStockThreshold));
          toast.success("Low stock threshold updated");
        }
      })
      .catch((err: { message?: string }) => toast.error(err.message ?? "Update failed"));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  if (!stock) {
    return (
      <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
        <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
          <Link to="/products">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Products</span>
            </button>
          </Link>
          <h1 className="text-xl md:text-3xl font-bold">Stock</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
          <p className="text-gray-400 max-w-4xl mx-auto">
            No stock entry exists for &quot;{product.name}&quot;. Stock is
            created when the product is added.
          </p>
          <div className="max-w-4xl mx-auto mt-6">
            <Link
              to={`/products/${productId}/manage`}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Go to product management
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      <div className="sticky top-0 z-60 px-4 py-4 bg-gray-900 flex flex-wrap gap-3 justify-between items-center border-b border-gray-700">
        <Link to="/products">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Products</span>
          </button>
        </Link>
        <h1 className="text-lg md:text-xl font-bold order-last sm:order-none w-full sm:w-auto text-center sm:text-left flex flex-col items-center">
          <span className="text-gray-400">{product.name}</span>
        </h1>
        <Link
          to={`/products/${productId}/manage`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold no-underline inline-flex items-center"
        >
          Edit product
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <label className="block mb-2 font-medium">Quantity</label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!canEditStock}
                onClick={() => handleStep(-1)}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg border border-gray-700"
                aria-label="Decrease quantity"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                min={0}
                step={1}
                disabled={!canEditStock}
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                onBlur={handleQuantityBlur}
                className="w-32 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="button"
                disabled={!canEditStock}
                onClick={() => handleStep(1)}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg border border-gray-700"
                aria-label="Increase quantity"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {!canEditStock && (
              <p className="text-sm text-gray-500 mt-2">
                Only administrators and owners can change stock levels.
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Low stock threshold
            </label>
            <div className="flex flex-wrap items-end gap-3">
              <input
                type="number"
                min={0}
                step={1}
                disabled={!canEditStock}
                value={thresholdInput}
                onChange={(e) => setThresholdInput(e.target.value)}
                className="w-full max-w-xs p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="button"
                disabled={!canEditStock}
                onClick={handleSaveThreshold}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-semibold"
              >
                Save threshold
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Last updated
              </label>
              <input
                readOnly
                type="text"
                value={new Date(stock.timestamp).toLocaleString("en-gb")}
                className="w-full p-3 rounded bg-gray-950 text-gray-500 border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Stock ID
              </label>
              <input
                readOnly
                type="text"
                value={stock.id}
                className="w-full p-3 rounded bg-gray-950 text-gray-500 border border-gray-700 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
