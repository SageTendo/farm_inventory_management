import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item } from "../../../views/pos/Shop";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface CheckoutScreenProps {
  cart: Item[];
  cartTotal: number;
  onClose: () => void;
  onCancelPayment: () => void;
  onConfirmPayment: (currency: "USD" | "ZIG") => void;
}

export function CheckoutScreen({
  cart,
  cartTotal,
  onClose,
  onConfirmPayment,
  onCancelPayment,
}: CheckoutScreenProps) {
  const [currency, setCurrency] = useState<"USD" | "ZIG">("USD");
  const [amountToPay, setAmountToPay] = useState(0);

  const convertTotal = currency === "ZIG" ? cartTotal * 20 : cartTotal;

  function handleCurrencyChange(curr: "USD" | "ZIG") {
    const converted = curr === "USD" ? amountToPay / 20 : amountToPay * 20;
    setAmountToPay(converted);
    setCurrency(curr);
  }

  function handleAmountToPay(amount: number) {
    setAmountToPay(amount);
  }

  /**
   * TODO:
   * - Add a loading state
   * - Add a success state
   * - Add a failure state
   * - Red highlight on insufficient amount to pay
   * - Prevent confirmation if amount to pay is less than cart total
   * - Move types to a separate file
   **/

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
          <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-inner">
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
                const price = currency === "USD" ? item.sellPrice : item.sellPrice * 20;
                const subtotal = price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 bg-gray-900/60 rounded-xl"
                  >
                    <span className="w-1/4 break-words">{item.name}</span>
                    <span className="w-1/4 text-right">x{item.quantity}</span>
                    <span className="w-1/4 text-right">
                      {currency === "USD" ? "$" : "Z$"} {price.toFixed(2)}
                    </span>
                    <span className="w-1/4 text-right font-semibold text-green-400">
                      {currency === "USD" ? "$" : "Z$"} {subtotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700 text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-400">
                {currency === "USD" ? "$" : "Z$"} {convertTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Right: Payment */}
          <div className="w-full h-fit lg:w-[35%] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-inner flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Payment</h2>

            <input
              type="number"
              onChange={(e) => handleAmountToPay(e.target.valueAsNumber)}
              className="w-full p-4 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Enter amount"
            />

            {/* Currency toggle */}
            <div className="flex gap-3">
              {["USD", "ZIG"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => handleCurrencyChange(curr as "USD" | "ZIG")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                    currency === curr
                      ? "bg-white text-black border-white"
                      : "border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Summary Card */}
            <div className="bg-gray-900/60 rounded-xl p-5 border border-gray-700 space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Currency</span>
                <span className="font-semibold">{currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span>{convertTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paid</span>
                <span>{amountToPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-400 font-bold pt-1 border-t border-gray-700">
                <span>Change</span>
                <span>{(amountToPay - convertTotal).toFixed(2)}</span>
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
                className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-bold"
                onClick={() => onConfirmPayment(currency)}
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
