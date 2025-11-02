import {
  faBackward,
  faForward,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const QUERY_LIMIT_OPTIONS = [10, 25, 50, 100];
export interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  onSetLimit: (limit: number, limitOptions: number[]) => void;
  onSetPage: (pageNumber: number) => void;
  onStartPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onEndPage: () => void;
}

export function Pagination({
  page,
  totalPages,
  limit,
  onSetLimit,
  onSetPage,
  onStartPage,
  onPreviousPage,
  onNextPage,
  onEndPage,
}: PaginationProps) {
  return (
    <div
      className="
      flex flex-col sm:flex-row sm:items-center sm:justify-between 
      w-full text-sm text-gray-600 
      px-4 sm:px-10 py-3 gap-3 border-t border-gray-200
    "
    >
      {/* Items per page selector */}
      <div className="hidden md:flex flex-wrap items-center gap-2 justify-center sm:justify-start">
        <span className="text-black text-base">Items per page</span>
        <select
          value={limit}
          onChange={(e) =>
            onSetLimit(Number(e.target.value), QUERY_LIMIT_OPTIONS)
          }
          className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-200"
        >
          {QUERY_LIMIT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <button
          onClick={onStartPage}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button
          onClick={onPreviousPage}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>

        <div className="flex items-center gap-1">
          <input
            type="number"
            value={page}
            onChange={(e) =>
              onSetPage(
                Math.min(Math.max(1, Number(e.target.value)), totalPages)
              )
            }
            className="w-14 text-center border rounded p-1"
          />
          <span>of {totalPages}</span>
        </div>

        <button
          onClick={onNextPage}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          disabled={page === totalPages}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
        <button
          onClick={onEndPage}
          className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          disabled={page === totalPages}
        >
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
    </div>
  );
}
