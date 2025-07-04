import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Product } from "../../../../mock/pos_data.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const HIGH_STOCK_COLOR = "bg-success";
const LOW_STOCK_COLOR = "bg-warning text-dark";
const NO_STOCK_COLOR = "bg-danger";

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const tooltipMessage =
    product.stock > 30
      ? "High stock"
      : product.stock > 0
        ? "Low stock"
        : "Out of stock";
  const stockColor =
    product.stock > 30
      ? HIGH_STOCK_COLOR
      : product.stock > 0
        ? LOW_STOCK_COLOR
        : NO_STOCK_COLOR;

  return (
    <Card className="h-100 shadow bg-dark text-light border-0 rounded-3">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bolder mb-2">{product.name}</h5>

        <div className="d-flex flex-column mb-2">
          <span className="fw-light fs-6">USD: {product.sellPrice}</span>
          <span className="fw-light fs-6">
            ZIG: {(product.sellPrice * 20).toFixed(2)}
          </span>
        </div>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{tooltipMessage}</Tooltip>}
        >
          <span
            className={`badge ${stockColor} rounded-0 mb-3 fw-semibold fs-6`}
          >
            Stock:
            {product.stock}
          </span>
        </OverlayTrigger>

        <div className="mt-auto">
          <button
            className="btn btn-outline-light w-100 rounded-3 d-flex align-items-center justify-content-center gap-2"
            onClick={() => addToCart(product)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to cart
          </button>
        </div>
      </div>
    </Card>
  );
};
