import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../views/pos/Shop";

interface CartItemProps {
  item: Item;
  changeQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

export const CartItem = ({
  item,
  changeQuantity,
  removeItem,
}: CartItemProps) => {
  return (
    <div className="bg-gray-800 border border-gray-600 text-white rounded-lg p-2 flex justify-between items-center shadow-sm">
      {/* Item info */}
      <div className="p-2 pr-6">
        <h5 className="font-bold mb-1">{item.name}</h5>
        <div className="text-sm text-gray-300">Price: ${item.sellPrice.read}</div>
        <div className="text-sm text-gray-300">Quantity: {item.quantity}</div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
      <button
          onClick={() => removeItem(item.id)}
          className="p-4 px-5 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-sm"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button
          onClick={() => changeQuantity(item.id, -1)}
          disabled={item.quantity <= 1}
          className={`p-4 px-5 rounded border ${
            item.quantity <= 1
              ? "border-gray-500 text-gray-500 cursor-not-allowed"
              : "border-white text-white hover:bg-white hover:text-black"
          } transition text-sm`}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <button
          onClick={() => changeQuantity(item.id, 1)}
          className="p-4 px-5 rounded border border-white text-white hover:bg-white hover:text-black transition text-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

      </div>
    </div>
  );
};
