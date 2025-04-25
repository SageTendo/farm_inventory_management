import {useState} from "react";
import {faBox} from "@fortawesome/free-solid-svg-icons";
import {ListPage} from "../../components/ListPage.tsx";

const dummy: Record<string, any>[] = [
  {
    id: 1,
    name: "Product 1",
    buyPrice: 100,
    sellPrice: 200,
    quantity: 10
  },
  {
    id: 2,
    name: "Product 2",
    buyPrice: 150,
    sellPrice: 250,
    quantity: 5
  },
  {
    id: 3,
    name: "Product 3",
    buyPrice: 200,
    sellPrice: 300,
    quantity: 8
  },
  {
    id: 4,
    name: "Product 4",
    buyPrice: 250,
    sellPrice: 350,
    quantity: 12
  },
  {
    id: 5,
    name: "Product 5",
    buyPrice: 300,
    sellPrice: 400,
    quantity: 15
  },
  {
    id: 6,
    name: "Product 6",
    buyPrice: 350,
    sellPrice: 450,
    quantity: 18
  },
  {
    id: 7,
    name: "Product 7",
    buyPrice: 400,
    sellPrice: 500,
    quantity: 20
  },
  {
    id: 8,
    name: "Product 8",
    buyPrice: 450,
    sellPrice: 550,
    quantity: 22
  },
  {
    id: 9,
    name: "Product 9",
    buyPrice: 500,
    sellPrice: 600,
    quantity: 25
  },
  {
    id: 10,
    name: "Product 10",
    buyPrice: 550,
    sellPrice: 650,
    quantity: 28
  },
  {
    id: 11,
    name: "Product 11",
    buyPrice: 600,
    sellPrice: 700,
    quantity: 30
  }
];


export function Products() {
  const [data, setData] = useState(dummy);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    //   TODO: Handle search logic here
    console.log(query)
  };

  const labels = ["Name", "Buy Price", "Sell Price", "Quantity"];
  const keys = ["name", "buyPrice", "sellPrice", "quantity"];

  return (
    <ListPage
      title="Product"
      icon={faBox}
      addRoute="/products/new"
      searchPlaceholder="Search products..."
      entity="products"
      onQueryChange={setQuery}
      onSearch={handleSearch}
      data={data}
      labels={labels}
      keys={keys}
      actionable={true}
    />
  )
}
