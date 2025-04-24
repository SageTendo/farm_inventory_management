import {useState} from "react";
import {Button, Container} from "react-bootstrap";
import ProductsTable from "./ProductsTable.tsx";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

export function Products() {
  const [query, setQuery] = useState("");

  const dummy = [
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

  const [data, setData] = useState(dummy);

  const handleSearch = () => {
    //   TODO: Handle search logic here
    console.log(query)
  };


  return (
    <Container fluid className="d-flex flex-column h-100 overflow-hidden">
      <h1 className="mb-4 fw-bold">📦 Products</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="d-flex justify-content-end">
        <Link className="justify-content-end btn-success mb-3"
              to="/products/new"
        >
          <Button variant="success">
            <FontAwesomeIcon icon={faPlus} className="nav-icon"/>
            <span className="mx-2">Add Product</span>
          </Button>
        </Link>
      </div>

      <ProductsTable data={data}/>

      {/* TODO: Pagination */}
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link rounded-pill mx-1 text-dark bg-dark-subtle" href="#">1</a>
        </li>
        <li className="page-item">
          <a className="page-link rounded-pill mx-1 text-dark bg-dark-subtle" href="#">2</a>
        </li>
        <li className="page-item">
          <a className="page-link rounded-pill mx-1 text-dark bg-dark-subtle" href="#">3</a>
        </li>
        {/* More items */}
      </ul>
    </Container>
  )
    ;
}
