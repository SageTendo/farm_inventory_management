import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../views/pos/POS.tsx";

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
    <Card
      key={item.id}
      className="bg-dark border-1 border-white text-light rounded-2 mb-3"
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1 fw-bold">{item.name}</h6>
          <small className="d-block">Price: ${item.sellPrice}</small>
          <small className="d-block">Quantity: {item.quantity}</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => changeQuantity(item.id, -1)}
            disabled={item.quantity <= 1}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => changeQuantity(item.id, 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeItem(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
