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
    <div className="overflow-x-hidden flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.length === 0 && (
          <div className="col-span-3 flex justify-center items-center">
            <p className="text-2xl font-bold text-gray-500">
              No products found
            </p>
          </div>
        )}

        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};
