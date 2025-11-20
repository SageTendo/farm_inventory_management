import { atom } from "jotai";
import { ProductDTO } from "../../shared/dto/product";

export const isMobileAtom = atom(false);
export const exchangeRateAtom = atom(20);

export const isFetchingProductsAtom = atom(false);
export const productsAtom = atom<ProductDTO[]>([]);