import { Product } from "../../../../mock/pos_data.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipMessage =
    product.stock > 30
      ? "High stock"
      : product.stock > 0
        ? "Low stock"
        : "Out of stock";

  const stockColor =
    product.stock > 30
      ? "bg-green-600 text-white"
      : product.stock > 0
        ? "bg-yellow-400 text-black"
        : "bg-red-600 text-white";

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-md p-3.5 h-full flex flex-col relative group">
      <h5 className="text-1xl font-extrabold mb-2">{product.name}</h5>

      <div className="mb-2 text-sm">
        <div className="font-bold text-gray-200">USD: {product.sellPrice}</div>
        <div className="font-bold text-gray-200">
          ZIG: {(product.sellPrice * 20).toFixed(2)}
        </div>
      </div>

      {/* Stock badge + tooltip */}
      <div
        className={`inline-block w-24 px-2 py-1 text-sm font-semibold rounded rounded-2 ${stockColor} mb-3 relative cursor-help`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Stock: {product.stock}
        {showTooltip && (
          <div className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow z-10">
            {tooltipMessage}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-lg hover:bg-blue-950 hover:text-gray-900 font-semibold py-2 rounded-lg transition"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};
