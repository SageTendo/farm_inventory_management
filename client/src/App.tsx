import "./App.css";
import Dashboard from "./ui/components/Dashboard";
import LoginComponent from "./ui/components/Login";
import Sidebar from "./ui/components/Sidebar";
import {ProductsOverview} from "./ui/components/ProductsOverview.tsx";

function App() {
  return (
    <>
      <div className="App">
        {/*<Sidebar />*/}
         <LoginComponent />
        {/*<Dashboard />*/}
      </div>
    </>
  );
}

export default App;
