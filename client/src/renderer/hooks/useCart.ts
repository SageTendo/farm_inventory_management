import { useEffect } from "react";
import { CartItemDTO, ProductDTO } from "../../shared/dto/product";
import { Money } from "../../lib/money";
import toast from "react-hot-toast";
import { useAtom, useSetAtom } from "jotai";
import {
  cartAtom,
  cartItemsCountAtom,
  cartTotalAtom,
} from "../atoms/shop.atom";
import { trpcClient } from "../../shared/trpc/client";

export function useCart() {
  const [cart, setCart] = useAtom(cartAtom);
  const setCartTotal = useSetAtom(cartTotalAtom);
  const setCartItemsCount = useSetAtom(cartItemsCountAtom);

  // Compute cart total and item count
  useEffect(() => {
    const cartTotal = cart.reduce(
      (total, item) => total + item.sellPrice.multiply(item.quantity).toDollars,
      0
    );
    setCartTotal(Money.fromDollars(cartTotal));
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

  async function updateCartItem(productId: string, delta: number) {
    if (delta === 0) return;

    const cartItem = cart.find((item) => item.id === productId);
    const product = await trpcClient.product.getById.query({
      id: productId,
    });

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

  async function checkout(paidAmount: Money, changeAmount: Money): Promise<void> {
    // TODO: implement payment
    // Things to do:
    // - Update stock in database
    // - Verify stock availability
    // - When inventory update is complete, clear cart and close checkout screen
    // - If payment is complete, show success message
    // - Generate receipt and export to PDF ??
    // - Update products list ??
    // - If payment is not complete, show error message
    // console.log("Total amount:", cartTotal.toDollars);
    console.log("Payment received:", paidAmount.toDollars);
    console.log("Change amount:", changeAmount.toDollars);
    throw new Error("Function not implemented.");
  }

  return {
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart,
    checkout,
  };
}
