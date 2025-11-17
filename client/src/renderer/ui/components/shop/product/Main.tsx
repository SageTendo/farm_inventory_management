import { ProductDTO } from "../../../../../shared/dto/product";
import { ProductCard } from "./ProductCard";

interface ProductListingProps {
  products: ProductDTO[];
  onAddToCart: (product: ProductDTO) => void;
}

export const ProductsListing = ({
  products,
  onAddToCart,
}: ProductListingProps) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto pr-1">
      <h2 className="font-bold mb-3 text-2xl text-gray-800">Products</h2>
      <div className="overflow-x-hidden flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4 md:pb-4">
          {products.length === 0 ? (
            <div className="col-span-3 flex justify-center items-center mt-3">
              <p className="text-2xl font-bold text-gray-500">
                No products found
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} addToCart={onAddToCart} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
