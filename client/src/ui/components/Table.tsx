import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Props {
  entity: string;
  labels: string[];
  keys: string[];
  data: Record<string, any>[];
  actionable?: boolean;
}

enum SortOrder {
  NONE = "",
  ASC = "asc",
  DESC = "desc",
}

export function Table({ entity, labels, keys, data, actionable = false }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NONE);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder(SortOrder.ASC);
    } else {
      setSortOrder((prev) =>
        prev === SortOrder.ASC ? SortOrder.DESC : prev === SortOrder.DESC ? SortOrder.NONE : SortOrder.ASC
      );
      if (sortOrder === SortOrder.DESC) setSortKey(null);
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey], bVal = b[sortKey];
    if (aVal === undefined || bVal === undefined) return 0;

    if (typeof aVal === "number" && typeof bVal === "number")
      return sortOrder === SortOrder.ASC ? aVal - bVal : bVal - aVal;

    return sortOrder === SortOrder.ASC
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <div className="h-full w-full overflow-x-auto rounded-xl border border-gray-700 bg-gray-900">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-gray-800 sticky top-0 z-10">
          <tr>
            {labels.map((label, i) => {
              const key = keys[i];
              const isSorted = sortKey === key;

              return (
                <th
                  key={key}
                  className="px-4 py-3 cursor-pointer select-none hover:bg-gray-700 transition sticky top-0 bg-gray-800 z-20"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center justify-between">
                    {label}
                    <span className="ml-2">
                      {isSorted ? (
                        sortOrder === SortOrder.ASC ? (
                          <FontAwesomeIcon icon={faSortUp} />
                        ) : sortOrder === SortOrder.DESC ? (
                          <FontAwesomeIcon icon={faSortDown} />
                        ) : (
                          <FontAwesomeIcon icon={faSort} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faSort} />
                      )}
                    </span>
                  </div>
                </th>
              );
            })}
            {actionable && (
              <th className="px-4 py-3 text-right sticky top-0 bg-gray-800 z-20">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {sortedData.map((item, idx) => (
            <tr key={item.id || idx} className="hover:bg-gray-800">
              {keys.map((key, keyIdx) => (
                <td key={keyIdx} className="px-4 py-3">
                  {item[key]}
                </td>
              ))}
              {actionable && (
                <td className="px-4 py-3 text-right">
                  <Link to={`/${entity}/${item.id}/manage`}>
                    <button className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-400 transition text-sm inline-flex items-center gap-1">
                      <FontAwesomeIcon icon={faEdit} />
                      Manage
                    </button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
