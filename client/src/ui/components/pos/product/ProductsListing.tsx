import { Col, Row } from "react-bootstrap";
import { Product } from "../../../../mock/pos_data.ts";
import { ProductCard } from "./ProductCard.tsx";

interface ProductListingProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductsListing = ({
  products,
  addToCart,
}: ProductListingProps) => {
  return (
    <div className="overflow-x-hidden pe-1 flex-grow-1">
      <div className="flex-grow-1 d-flex flex-column">
        <div className="overflow-hidden pe-1 flex-grow-1">
          <Row className="row-cols-1 row-cols-md-1 row-cols-sm-1 row-cols-lg-2 row-cols-xl-3 g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
