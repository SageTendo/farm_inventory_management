import { SummaryCard } from "../components/SummaryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center px-3">
        <h1 className="mb-4 fw-bold">
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          Dashboard
        </h1>

        {/* Summary cards */}
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-3">
          <Col>
            <SummaryCard title="Total products" bg="primary">
              <Card.Text className="fs-3 fw-bold text-end">100</Card.Text>
            </SummaryCard>
          </Col>

          <Col>
            <SummaryCard title="Total sales" bg="success">
              <Card.Text className="fs-3 fw-bold text-end">100</Card.Text>
            </SummaryCard>
          </Col>

          <Col>
            <SummaryCard title="Low stock products" bg="warning">
              <Card.Text className="fs-3 fw-bold text-end">100</Card.Text>
            </SummaryCard>
          </Col>

          <Col>
            <SummaryCard title="Out of stock products" bg="danger">
              <Card.Text className="fs-3 fw-bold text-end">100</Card.Text>
            </SummaryCard>
          </Col>
        </Row>

        {/* Add New product widget */}
        <div className="my-4">
          <Card className="shadow-lg bg-dark text-light">
            <Card.Body>
              <Card.Title className="mb-4 text-center fs-1 fw-bold">
                Add New Product
              </Card.Title>
              <Card.Text className="fs-3 fw-bold text-center">
                <Link to="/products/new" className="text-decoration-none text-reset">
                  <Button variant="success" className="rounded-3">
                    <FontAwesomeIcon icon={faPlus} className="nav-icon" />
                    <span className="nav-title fw-bolder">Add Product</span>
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Add New Sale widget */}
        {/*<div className="my-4">*/}
        {/*  <Card className="shadow-lg bg-dark text-light">*/}
        {/*    <Card.Body>*/}
        {/*      <Card.Title className="mb-4 text-center fs-1 fw-bold">*/}
        {/*        Add New Sale*/}
        {/*      </Card.Title>*/}
        {/*      <Card.Text className="fs-3 fw-bold text-center">*/}
        {/*        <Link to="/sales/new" className="text-decoration-none text-reset">*/}
        {/*          <Button variant="success" className="rounded-3">*/}
        {/*            <FontAwesomeIcon icon={faPlus} className="nav-icon"/>*/}
        {/*            <span className="nav-title fw-bolder">Add Sale</span>*/}
        {/*          </Button>*/}
        {/*        </Link>*/}
        {/*      </Card.Text>*/}
        {/*    </Card.Body>*/}
        {/*  </Card>*/}
        {/*</div> */}

        {/* Add New User widget */}
        <div className="my-4">
          <Card className="shadow-lg bg-dark text-light">
            <Card.Body>
              <Card.Title className="mb-4 text-center fs-1 fw-bold">
                Add New User
              </Card.Title>
              <Card.Text className="fs-3 fw-bold text-center">
                <Link to="/users/new" className="text-decoration-none text-reset">
                  <Button variant="success" className="rounded-3">
                    <FontAwesomeIcon icon={faPlus} className="nav-icon" />
                    <span className="nav-title fw-bolder">Add User</span>
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
