import ReactDOM from "react-dom/client";
import { useUserState } from "store/store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Index from "./Routes/Index.jsx";

const App = () => {
  const user = useUserState((state) => state.name);
  return (
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
