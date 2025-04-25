import {Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

interface Props {
  entity: string
  labels: string[],
  keys: string[],
  data: Record<string, any>[]
  actionable?: boolean
}

export function TableComponent(props: Props) {
  return (<>
    <div className="table-responsive">
      <Table striped bordered hover variant="dark" className="rounded-3 text-center overflow-hidden">
        {/* HEADER */}
        <thead>
        <tr>
          {
            props.labels.map((label, index) => (
              <th key={index}>{label}</th>
            ))
          }
          {!props.actionable ? null : <th/>}
        </tr>
        </thead>

        {/* BODY */}
        <tbody>
        {props.data.map((item, index) => (
          <tr key={item.id || index}>
            {props.keys.map((key, keyIndex) => (
              <td key={keyIndex}>{item[key]}</td>
            ))}

            {/* ACTIONS */}
            {!props.actionable ? null :
              <td className="d-flex justify-content-evenly">
                {/* Manage */}
                <Link className="text-reset text-decoration-none" to={`/${props.entity}/${item.id}/manage`}>
                  <Button className="rounded-pill"
                          variant="outline-warning"
                          size="sm">
                    <FontAwesomeIcon icon={faEdit}/>
                    <span className="ms-2">Manage</span>
                  </Button>
                </Link>
              </td>
            }
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  </>);
}

export default TableComponent;