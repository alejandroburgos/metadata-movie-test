import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import "./styles/global.scss";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Overlay from "./components/Overlay";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider>
          <Suspense fallback={null}>
            <App />
          </Suspense>
          <Overlay />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
    {/* <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} /> */}
  </>
);
