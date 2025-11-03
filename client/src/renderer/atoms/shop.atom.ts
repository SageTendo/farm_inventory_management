import { atom } from "jotai";
import { CartItemDTO } from "../../shared/dto/product";
import { Money } from "../../lib/money";
import { CurrencyType } from "../../shared/types";

// Cart State
export const cartOpenAtom = atom(false);
export const cartAtom = atom<CartItemDTO[]>([]);
export const cartItemsCountAtom = atom(0);
export const cartTotalAtom = atom(Money.fromNumber(0));

// Checkout Screen State
export const checkoutOpenAtom = atom(false);
export const selectedCurrencyAtom = atom<CurrencyType>("USD");
