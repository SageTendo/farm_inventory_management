import { useState, useEffect } from "react";
import { CartItemDTO, ProductDTO } from "../../shared/dto/product";
import { Money } from "../../lib/money";
import toast from "react-hot-toast";

export function useCart(products: ProductDTO[]) {
  const [cart, setCart] = useState<CartItemDTO[]>([]);
  const [cartTotal, setCartTotal] = useState(Money.fromNumber(0));
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Compute cart total and item count
  useEffect(() => {
    const cartTotal = cart.reduce(
      (total, item) => total + item.sellPrice.multiply(item.quantity).toDollars,
      0
    );
    setCartTotal(Money.fromNumber(cartTotal));
    setCartItemsCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  function addCartItem(product: ProductDTO) {
    const existing = cart.find((item) => item.id == product.id);
    const quantityInCart = existing?.quantity ?? 0;
    const availableStock = product.quantity - quantityInCart;

    if (availableStock <= 0) {
      toast.error(`OUT OF STOCK: ${product.name}`);
      return;
    }

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newCartItem = CartItemDTO.parse(product);
      setCart((prev) => [...prev, { ...newCartItem, quantity: 1 }]);
    }
  }

  function updateCartItem(productId: string, delta: number) {
    if (delta === 0) return;

    const cartItem = cart.find((item) => item.id === productId);
    const product = products.find((item) => item.id === productId); // from full list

    if (!cartItem || !product) return;

    const newQuantity = cartItem.quantity + delta;
    const maxStock = product.quantity;

    if (newQuantity < 1) {
      removeCartItem(productId);
      return;
    }

    if (newQuantity > maxStock) {
      toast.error(`NOT ENOUGH STOCK: ${product.name}.`);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeCartItem(productId: string) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    cartTotal,
    cartItemsCount,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart,
  };
}
