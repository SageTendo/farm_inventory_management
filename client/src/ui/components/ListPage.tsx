import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Button, Container} from "react-bootstrap";
import TableComponent from "./Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface ListPageProps {
  title: string
  icon: IconProp
  addRoute: string
  searchPlaceholder?: string
  query?: string
  onQueryChange: (query: string) => void
  onSearch?: () => void;
  entity: string
  data: Record<string, any>[];
  labels: string[];
  keys: string[];
  actionable?: boolean
}

export function ListPage({
                           title,
                           icon,
                           addRoute,
                           searchPlaceholder,
                           query,
                           onQueryChange,
                           onSearch,
                           entity,
                           data,
                           labels,
                           keys,
                           actionable
                         }: ListPageProps
) {
  return (
    <Container fluid className="d-flex flex-column h-100 overflow-hidden">
      <h1 className="mb-4 fw-bold">
        <FontAwesomeIcon icon={icon} className="nav-icon"/>
        <span className="mx-2">{title} Management</span>
      </h1>

      <div className="input-group mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="form-control"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={onSearch}>
          Search
        </button>
      </div>

      <div className="d-flex justify-content-end">
        <Link className="justify-content-end btn-success mb-3" to={addRoute}>
          <Button variant="primary" className="rounded-3">
            <FontAwesomeIcon icon={faPlus} className="nav-icon"/>
            <span className="mx-2">New {title}</span>
          </Button>
        </Link>
      </div>

      <TableComponent
        entity={entity}
        labels={labels}
        keys={keys}
        data={data}
        actionable={actionable}
      />
    </Container>
  );
}