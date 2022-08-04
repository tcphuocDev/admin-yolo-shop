import "./App.css";
import "braft-editor/dist/index.css";
import { useStore } from "./redux/store";
import { Provider } from "react-redux";
import routes from "./router";
import { useRoutes } from "react-router-dom";
import Enviroment from "./components/Enviroment";

function App(props) {
  const store = useStore(props.initialReduxState);

  return (
    <Provider store={store}>
      <Enviroment>{useRoutes(routes)}</Enviroment>
    </Provider>
  );
}

export default App;
