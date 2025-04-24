import {Component} from "react";
import {Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

class TableComponent extends Component {

  protected data: { id: number, name: string, buyPrice: number, sellPrice: number }[] = [];

  constructor(props: any) {
    super(props);
    this.data = props.data
  }

  render() {
    return (<>
      <div className="table-responsive">
        <Table striped bordered hover variant="dark" className="rounded-3 text-center overflow-hidden">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          {this.data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.buyPrice}</td>
              <td>{item.sellPrice}</td>
              <td>
                {/*  TODO: Add Quantity */}
                N/A
              </td>
              <td>
                <Button className="rounded-pill"
                        variant="outline-warning"
                        size="sm">
                  <FontAwesomeIcon icon={faEdit}/>
                  <span className="ms-2">Manage</span>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </>);
  }
}

export default TableComponent;