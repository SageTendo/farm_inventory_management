import "./App.css";
import Dashboard from "./ui/components/Dashboard";
import LoginComponent from "./ui/components/Login";
import Sidebar from "./ui/components/Sidebar";

function App() {
  return (
    <>
      <div className="App">
        {/* <Nabar /> */}
        <Sidebar />
        {/* <LoginComponent /> */}
        <Dashboard />
      </div>
    </>
  );
}

export default App;
