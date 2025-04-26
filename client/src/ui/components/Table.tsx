import {useState} from "react";
import {Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import "../styles/tableComponent.css"; // we'll add a small CSS file for hover effects

interface Props {
  entity: string
  labels: string[],
  keys: string[],
  data: Record<string, any>[]
  actionable?: boolean
}

export function TableComponent(props: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  const sortedData = [...props.data].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div className="table-responsive">
      <Table striped bordered hover variant="dark" className="rounded-3 text-center overflow-hidden">

        {/* HEADER */}
        <thead>
        <tr>
          {props.labels.map((label, index) => {
            const key = props.keys[index];
            const isSorted = sortKey === key;

            return (
              <th
                key={index}
                className="sortable-header"
                onClick={() => handleSort(key)}
              >
                {label}
                <span className="ms-1 text-white" style={{fontSize: "0.8rem"}}>
                    {isSorted ? (sortOrder === "asc" ?
                        <FontAwesomeIcon icon={faSortUp}/> :
                        <FontAwesomeIcon icon={faSortDown}/>) :
                      <FontAwesomeIcon icon={faSort}/>}
                  </span>
              </th>
            );
          })}
          {!props.actionable ? null : <th/>}
        </tr>
        </thead>

        {/* BODY */}
        <tbody>
        {sortedData.map((item, index) => (
          <tr key={item.id || index}>
            {props.keys.map((key, keyIndex) => (
              <td key={keyIndex}>{item[key]}</td>
            ))}

            {!props.actionable ? null : (
              <td className="d-flex justify-content-evenly">
                <Link
                  className="text-reset text-decoration-none"
                  to={`/${props.entity}/${item.id}/manage`}
                >
                  <Button
                    className="rounded-pill"
                    variant="outline-warning"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faEdit}/>
                    <span className="ms-2">Manage</span>
                  </Button>
                </Link>
              </td>
            )}
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
