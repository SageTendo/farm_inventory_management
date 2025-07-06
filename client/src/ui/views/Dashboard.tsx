import { SummaryCard } from "../components/shared/SummaryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col h-full overflow-hidden p-4 pt-4">
      <h1 className="mb-6 text-4xl font-bold flex items-center gap-3">
        <FontAwesomeIcon icon={faHome} className="text-primary" />
        Dashboard
      </h1>

      <div className="flex flex-col gap-6 overflow-y-auto flex-1 pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard title="Total products" bg="bg-blue-950">
            <p className="text-4xl font-bold text-right">100</p>
          </SummaryCard>

          <SummaryCard title="Total sales" bg="bg-green-800">
            <p className="text-4xl font-bold text-right">100</p>
          </SummaryCard>

          <SummaryCard title="Low stock products" bg="bg-amber-600">
            <p className="text-4xl font-bold text-right">100</p>
          </SummaryCard>

          <SummaryCard title="Out of stock products" bg="bg-red-700">
            <p className="text-4xl font-bold text-right">100</p>
          </SummaryCard>
        </div>

        <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-center text-3xl font-bold mb-4">
            Add New Product
          </h2>
          <div className="text-center">
            <Link to="/products/new">
              <button className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-lg text-lg inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} />
                Add Product
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-center text-3xl font-bold mb-4">Add New User</h2>
          <div className="text-center">
            <Link to="/users/new">
              <button className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-lg text-lg inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} />
                Add User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
