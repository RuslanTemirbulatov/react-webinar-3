import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./store/language-context";

const store = new Store();

const root = createRoot(document.getElementById("root"));

// Первый рендер приложения
root.render(
  <LanguageProvider>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </LanguageProvider>
);
