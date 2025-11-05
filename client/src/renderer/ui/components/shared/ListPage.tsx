import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Table } from "./Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

interface ListPageProps {
  title: string;
  icon: IconProp;
  addRoute: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  entity: string;
  data: any[];
  labels: string[];
  keys: string[];
  actionable?: boolean;
  paginationProps?: {
    page: number;
    totalPages: number;
    onStartPage: () => void;
    onEndPage: () => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
    onSetPage: (page: number) => void;
  };
}

export function ListPage({
  title,
  icon,
  addRoute,
  onSearch,
  entity,
  data,
  labels,
  keys,
  actionable,
  paginationProps,
}: ListPageProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden pt-4 px-4 pb-2 md:pb-0">
      <h1 className="flex mb-4 font-bold gap-3">
        <FontAwesomeIcon icon={icon} className="text-blue-900" />
        <span className="mx-2">{title} Management</span>
      </h1>

      <SearchBar onSearch={onSearch} />

      <div className="flex justify-end mb-3">
        <Link to={addRoute} className="no-underline">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            <span>New {title}</span>
          </button>
        </Link>
      </div>

      <div className="h-fit overflow-auto">
        <Table
          entity={entity}
          labels={labels}
          keys={keys}
          data={data}
          actionable={actionable}
        />
      </div>

      <Pagination
        page={paginationProps.page}
        totalPages={paginationProps.totalPages}
        onSetLimit={() => console.log("set limit")}
        onStartPage={paginationProps.onStartPage}
        onEndPage={paginationProps.onEndPage}
        onNextPage={paginationProps.onNextPage}
        onPreviousPage={paginationProps.onPreviousPage}
        onSetPage={paginationProps.onSetPage}
      />
    </div>
  );
}
