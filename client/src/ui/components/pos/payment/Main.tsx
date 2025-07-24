import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item } from "../../../views/pos/Shop";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Money } from "../../../../lib/money";
import {
  formatNumeral,
  registerCursorTracker,
  NumeralThousandGroupStyles,
} from "cleave-zen";

interface CheckoutScreenProps {
  cart: Item[];
  cartTotal: Money;
  selectedCurrency: "USD" | "ZIG";
  exchangeRate: number;
  onChangeSelectedCurrency: (currency: "USD" | "ZIG") => void;
  onClose: () => void;
  onCancelPayment: () => void;
  onConfirmPayment: () => void;
}

export function CheckoutScreen({
  cart,
  cartTotal,
  selectedCurrency,
  exchangeRate,
  onChangeSelectedCurrency,
  onClose,
  onConfirmPayment,
  onCancelPayment,
}: CheckoutScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [totalAmount, setTotalAmount] = useState(cartTotal);
  const [paidAmount, setPaidAmount] = useState(Money.fromNumber(0));
  const [changeAmount, setChangeAmount] = useState(Money.fromNumber(0));

  // Format values for display
  const numericFormat = (value: string, positiveOnly = false) => {
    return formatNumeral(value, {
      numeralPositiveOnly: positiveOnly,
      numeralThousandsGroupStyle: NumeralThousandGroupStyles.THOUSAND,
    });
  };
  const formattedInput = numericFormat(inputValue, true);
  const formattedTotalAmount = numericFormat(totalAmount.read, true);
  const formattedPaidAmount = numericFormat(paidAmount.read, true);
  const formattedChangeAmount = numericFormat(changeAmount.read);

  // Focus on input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update change amount when paid amount changes
  useEffect(() => {
    if (paidAmount.toCents === 0) {
      setChangeAmount(Money.fromNumber(0));
      return;
    }

    const amountReturned = paidAmount.subtract(totalAmount);
    setChangeAmount(amountReturned);
  }, [totalAmount, paidAmount]);

  useEffect(() => {
    // Call this in return to make sure it is unregister when component unmount
    return registerCursorTracker({ input: inputRef.current!, delimiter: "*" });
  }, []);

  // Update total amount (visual) when selected currency changes and clear inputs
  useEffect(() => {
    if (selectedCurrency === "USD") {
      setTotalAmount(cartTotal);
    } else {
      setTotalAmount(cartTotal.multiply(exchangeRate));
    }

    // Clear paid amount when selected currency changes
    inputRef.current!.value = "";
    setPaidAmount(Money.fromNumber(0));
    setInputValue("");
  }, [selectedCurrency]);

  const handleOnPaidAmountInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = event.target.value;
    setInputValue(raw);
  
    const sanitized = raw.replace(/[^\d.]/g, '');
    if (sanitized === '' || Number.isNaN(Number(sanitized))) return setPaidAmount(Money.fromNumber(0));
    setPaidAmount(Money.fromString(sanitized));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
      <div className="relative w-full max-w-7xl xl:max-w-[90%] h-fit bg-gray-950 text-white rounded-3xl shadow-2xl border border-gray-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Cart Summary */}
          <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-inner h-fit">
            <h2 className="text-xl font-semibold mb-4">Purchase Summary</h2>

            {/* Table header */}
            <div className="hidden md:flex text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 mb-3">
              <span className="w-1/4">Product</span>
              <span className="w-1/4 text-right">Qty</span>
              <span className="w-1/4 text-right">Price</span>
              <span className="w-1/4 text-right">Subtotal</span>
            </div>

            {/* Cart items */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {cart.map((item) => {
                const price =
                  selectedCurrency === "USD"
                    ? item.sellPrice
                    : item.sellPrice.multiply(exchangeRate);
                const subtotal = price.multiply(item.quantity);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 bg-gray-900/60 rounded-xl"
                  >
                    <span className="w-1/4 break-words">{item.name}</span>
                    <span className="w-1/4 text-right">x{item.quantity}</span>
                    <span className="w-1/4 text-right">
                      {selectedCurrency === "USD" ? "$" : "Z$"}{" "}
                      {numericFormat(price.read)}
                    </span>
                    <span className="w-1/4 text-right font-semibold text-green-400">
                      {selectedCurrency === "USD" ? "$" : "Z$"}{" "}
                      {numericFormat(subtotal.read)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700 text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-400">
                {selectedCurrency === "USD" ? "$" : "Z$"} {formattedTotalAmount}
              </span>
            </div>
          </div>

          {/* Right: Payment */}
          <div className="w-full h-fit lg:w-[35%] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-inner flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Payment</h2>

            {/* Currency toggle */}
            <div className="flex gap-3">
              {["USD", "ZIG"].map((curr) => (
                <button
                  key={curr}
                  onClick={() =>
                    onChangeSelectedCurrency(curr as "USD" | "ZIG")
                  }
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

            <input
              ref={inputRef}
              value={formattedInput}
              onChange={handleOnPaidAmountInput}
              className="w-full p-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter amount"
            />

            {/* Summary Card */}
            <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700 space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Currency</span>
                <span className="font-semibold">{selectedCurrency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span>{formattedTotalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paid</span>
                <span>{formattedPaidAmount}</span>
              </div>
              <div
                className={`flex justify-between ${
                  changeAmount.isZero()
                    ? "text-gray-400"
                    : changeAmount.isPositive()
                      ? "text-green-400"
                      : "text-red-400"
                } font-bold pt-1 border-t border-gray-700`}
              >
                <span>Change</span>
                <span>{formattedChangeAmount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-2">
              <button
                className="flex-1 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition font-medium"
                onClick={onCancelPayment}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={paidAmount.isZero() || changeAmount.isNegative()}
                onClick={onConfirmPayment}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
