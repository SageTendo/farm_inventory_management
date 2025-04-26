import {Button, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export function ManageUser() {

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const doDeleteUser = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    console.log("Deleting product...");
  }

  const doSaveUser = () => {
    console.log("Saving product...");
  }


  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="p-4 shadow-lg bg-dark text-light w-100"
          style={{maxWidth: "700px", borderRadius: "1.5rem"}}
        >
          <div className="d-flex mb-5">
            <Link to="/users" className="text-decoration-none text-reset me-5">
              <Button variant="danger" className="rounded-3">
                <FontAwesomeIcon icon={faArrowLeft} className="nav-icon"/>
                <span className="nav-title fw-bolder">Back</span>
              </Button>
            </Link>
          </div>

          <Card.Title className="mb-4 text-center fs-1 fw-bold">
            Manage User
          </Card.Title>

          <Form>
            {/* Add Fields */}

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
              <Form.Select type="text" placeholder="Enter user role" required>
                <option value="">Select User's Role</option>
                <option value="admin">Admin</option>
                <option value="user">Owner</option>
                <option value="guest">Staff</option>
              </Form.Select>
            </Form.Group>


            {/* Immutable Information */}
            <div className="d-flex flex-column">
              <div className="d-flex flex-row justify-content-between align-items-center">
                {/* Added Date */}
                <Form.Group controlId="formProductAddedDate" className="w-50 me-3">
                  <Form.Label>Added At: </Form.Label>
                  <Form.Control type="text" readOnly
                                className="bg-dark text-white"
                                disabled
                                value="2023-01-01"
                  />
                </Form.Group>

                {/* Updated Date */}
                <Form.Group controlId="formProductUpdatedBy" className="w-50">
                  <Form.Label>Updated At: </Form.Label>
                  <Form.Control type="text" readOnly
                                className="bg-dark text-white"
                                disabled
                                value="2023-01-01"/>
                </Form.Group>
              </div>
            </div>

            {/*  /!* Added By *!/*/}
            <Form.Group controlId="formProductAddedBy" className="mt-3 w-100">
              <Form.Label>Added By: </Form.Label>
              <Form.Control type="text" readOnly
                            className="bg-dark text-white"
                            disabled
                            value="John Doe"/>
            </Form.Group>

            <div className="d-flex flex-row justify-content-between align-items-center">
              <Button variant="danger" className="w-100 mt-3 mx-1"
                      onClick={doDeleteUser}>
                Delete User
              </Button>

              <Button id="saveProductBtn" variant="primary" className="w-100 mt-3 mx-1"
                      disabled={saveButtonDisabled}
                      onClick={doSaveUser}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}