import {Container, Row, Col, Button, Form, Card} from "react-bootstrap";

export function SettingsPage() {
  const handlePasswordChange = () => {
    //   TODO: Add logic to change password
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center w-100">
      <Card className="shadow-lg bg-dark text-light w-100">
        <Card.Body>
          <h1 className="mb-4">Settings</h1>

          {/* Account Section */}
          <Row className="mb-4">
            <Col>
              <h4>Account</h4>

              {/* User info*/}
              <div className="d-flex w-100 mb-3">
                <Form.Group className="w-50 me-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Full Name" disabled/>
                </Form.Group>

                <Form.Group className="w-50" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" disabled/>
                </Form.Group>
              </div>

              <Form className="mb-3">
                <div className="d-flex justify-content-between w-100 mb-3">
                  <Form.Group className="w-50 me-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required/>
                  </Form.Group>

                  {/* confirm password*/}
                  <Form.Group className="w-50" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required/>
                  </Form.Group>
                </div>

                <Button variant="primary" onClick={handlePasswordChange}>
                  Change Password
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
