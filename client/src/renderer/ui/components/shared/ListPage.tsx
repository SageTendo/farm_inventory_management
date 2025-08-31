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
      <h1 className="flex mb-4 font-bold gap-3">
        <FontAwesomeIcon icon={icon} className="text-blue-900" />
        <span className="mx-2">{title} Management</span>
      </h1>

      <div className="flex rounded-md shadow-sm mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full px-3 py-2 border rounded"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg" onClick={onSearch}>
          Search
        </button>
      </div>

      <div className="flex justify-end mb-3">
        <Link to={addRoute} className="no-underline">
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
