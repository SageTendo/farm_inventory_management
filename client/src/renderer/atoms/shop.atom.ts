import { atom } from "jotai";
import { CartItemDTO } from "../../shared/dto/product";
import { Money } from "../../lib/money";

// Cart State
export const cartOpenAtom = atom(false);
export const cartAtom = atom<CartItemDTO[]>([]);
export const cartItemsCountAtom = atom(0);
export const cartTotalAtom = atom(Money.fromNumber(0));

// Checkout Screen State
export const checkoutOpenAtom = atom(false);