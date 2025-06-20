import {Button, Card, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export function NewUser() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg bg-dark text-light w-100"
        style={{maxWidth: "700px", borderRadius: "1.5rem"}}
      >
        <div className="d-flex mb-5">
          <Link to="/users" className="text-decoration-none text-reset me-5">
            <Button variant="danger" className="rounded-3">
              <FontAwesomeIcon icon={faArrowLeft} className="nav-icon"/>
              <span className="nav-title fw-bolder">Cancel</span>
            </Button>
          </Link>
        </div>

        <Card.Title className="mb-4 text-center fs-1 fw-bold">
          Add User
        </Card.Title>

        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter user's full name" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required/>
            </Form.Group>


            <div className="d-flex flex-row justify-content-between">
              <Form.Group className="mb-3 w-50 me-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" required/>
              </Form.Group>

              <Form.Group className="mb-3 w-50" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" required/>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select>
                <option>Select user's role...</option>
                <option id="admin" value="admin">Admin</option>
                <option id="owner" value="owner">Owner</option>
                <option id="staff" value="staff">Staff</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" className="w-100 mt-3">
              Save User
            </Button>

          </Form>
        </Card.Body>


      </Card>
    </Container>
  );
}