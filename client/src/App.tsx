import { useRoutes } from "react-router-dom";
import routes from "./router/routes.tsx";

function App() {
  const element = useRoutes(routes);
  return <div className="w-screen h-screen">{element}</div>;
}

export default App;
