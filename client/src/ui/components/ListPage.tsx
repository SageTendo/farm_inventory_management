import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Table } from "./Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ListPageProps {
  title: string;
  icon: IconProp;
  addRoute: string;
  searchPlaceholder?: string;
  query?: string;
  onQueryChange: (query: string) => void;
  onSearch?: () => void;
  entity: string;
  data: Record<string, any>[];
  labels: string[];
  keys: string[];
  actionable?: boolean;
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
  actionable,
}: ListPageProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden pt-4 px-4 pb-2 md:pb-0">
      <h1 className="mb-4 font-bold">
        <FontAwesomeIcon icon={icon} className="" />
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

      <div className="flex justify-end mb-3">
        <Link to={addRoute}>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            <span>New {title}</span>
          </button>
        </Link>
      </div>

      <div className="overflow-auto">
        <Table
          entity={entity}
          labels={labels}
          keys={keys}
          data={data}
          actionable={actionable}
        />
      </div>
    </div>
  );
}
