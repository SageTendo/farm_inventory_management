import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isMobileAtom } from "../../../atoms";
import { useAtomValue } from "jotai";

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

export function Table({
  entity,
  labels,
  keys,
  data,
  actionable = false,
}: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NONE);
  const isMobile = useAtomValue(isMobileAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder(SortOrder.ASC);
    } else {
      setSortOrder((prev) =>
        prev === SortOrder.ASC
          ? SortOrder.DESC
          : prev === SortOrder.DESC
            ? SortOrder.NONE
            : SortOrder.ASC
      );
      if (sortOrder === SortOrder.DESC) setSortKey(null);
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey],
      bVal = b[sortKey];
    if (aVal === undefined || bVal === undefined) return 0;

    if (typeof aVal === "number" && typeof bVal === "number")
      return sortOrder === SortOrder.ASC ? aVal - bVal : bVal - aVal;

    return sortOrder === SortOrder.ASC
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const desktopTableView = () => {
    return (
      <table className="h-full min-w-full md:text-sm lg:text:md text-left text-white rounded-xl bg-gray-900 border-gray-700">
        <thead className="bg-blue-950 sticky top-0 z-60">
          <tr>
            {labels.map((label, i) => {
              const key = keys[i];
              const isSorted = sortKey === key;

              return (
                <th
                  key={key}
                  className={`px-4 py-3 cursor-pointer select-none ${isSorted ? "text-yellow-500" : ""} 
                  hover:bg-gray-700 hover:text-yellow-500 transition sticky top-0 z-20`}
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
              <th className="px-4 py-3 text-right sticky top-0 z-20">
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
    );
  };

  const mobileCardView = () => {
    return (
      <div className="flex flex-col space-y-3 divide-gray-700 text-white text-md">
        {/* Sort controls */}
        {sortedData.length > 0 && (
          <div className="px-4 py-3 flex items-center gap-2 justify-between rounded-xl border border-gray-700 bg-gray-900 sticky top-0">
            <div className="flex w-full flex-col">
              <div className="relative w-full">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg flex justify-between items-center focus:outline-none border border-gray-700 hover:bg-gray-700 transition"
                >
                  <span>
                    {sortKey
                      ? labels[keys.indexOf(sortKey)] || "Select field"
                      : "Sort by..."}
                  </span>
                  <FontAwesomeIcon
                    icon={faSort}
                    className={`transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <ul className="absolute z-30 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <li
                      className={`px-3 py-2 hover:bg-gray-700 cursor-pointer rounded-t-lg ${
                        sortKey === null ? "text-yellow-400" : ""
                      }`}
                      onClick={() => {
                        handleSort("");
                        setDropdownOpen(false);
                      }}
                    >
                      None
                    </li>
                    {keys.map((key, idx) => (
                      <li
                        key={key}
                        className={`px-3 py-2 hover:bg-gray-700 cursor-pointer ${
                          sortKey === key ? "text-yellow-400" : "text-white"
                        }`}
                        onClick={() => {
                          handleSort(key);
                          setDropdownOpen(false);
                        }}
                      >
                        {labels[idx]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {sortKey && (
              <div className="flex flex-col space-y-1">
                <button
                  className="ml-2 bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() =>
                    setSortOrder((prev) =>
                      prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
                    )
                  }
                >
                  {sortOrder === SortOrder.ASC ? "↑" : "↓"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cards  */}
        {sortedData.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 mx-2 mb-3 bg-gray-900 hover:bg-gray-800 transition rounded-xl"
          >
            {keys.map((key, keyIdx) => (
              <div key={keyIdx} className="flex justify-between py-1">
                <span className="font-semibold text-gray-300 pr-2">
                  {labels[keyIdx]}:
                </span>
                <span className="text-gray-100 text-right break-all">
                  {item[key] ?? "-"}
                </span>
              </div>
            ))}

            {actionable && (
              <div className="mt-3">
                <Link to={`/${entity}/${item.id}/manage`}>
                  <button className="w-full justify-center bg-yellow-400 text-black font-semibold px-3 py-3 rounded hover:bg-yellow-500 transition inline-flex items-center gap-1">
                    <FontAwesomeIcon icon={faEdit} />
                    Manage
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return isMobile ? mobileCardView() : desktopTableView();
}
