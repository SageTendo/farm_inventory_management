import { useAtom } from "jotai";
import { selectedCurrencyAtom } from "../../../../atoms/shop.atom";
import { currencyTypes } from "../../../../../shared/types";

export function CurrencyToggle() {
  const [selectedCurrency, setCurrency] = useAtom(selectedCurrencyAtom);
  return (
    <div className="flex gap-3">
      {currencyTypes.map((curr) => (
        <button
          key={curr}
          onClick={() => setCurrency(curr as "USD" | "ZIG")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
            selectedCurrency === curr
              ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-400"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          {curr}
        </button>
      ))}
    </div>
  );
}
