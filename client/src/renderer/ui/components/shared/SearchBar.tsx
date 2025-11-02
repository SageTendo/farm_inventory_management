import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full mb-4 shadow-sm rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-grow px-1 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
        }}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
        onClick={() => onSearch(query)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
