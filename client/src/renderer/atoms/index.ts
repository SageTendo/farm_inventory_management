import { atom } from "jotai";
import { useDetectScreenType } from "../hooks/useDetectScreenType";

export const isMobileAtom = atom(async () => useDetectScreenType());
export const exchangeRateAtom = atom(20);
