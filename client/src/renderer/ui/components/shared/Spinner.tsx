import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Spinner() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden text-white bg-gray-950">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 sm:px-10">
        <div className="flex items-center justify-center h-full">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    </div>
  );
}
