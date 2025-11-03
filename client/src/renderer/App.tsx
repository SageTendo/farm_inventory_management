import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import { useDetectScreenType } from "./hooks/useDetectScreenType";

function App() {
  useDetectScreenType();
  return useRoutes(routes);
}

export default App;
