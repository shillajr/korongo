
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { LanguageProvider } from "./contexts/LanguageContext";
  import { TanzaniaArrivalProvider } from "./contexts/TanzaniaArrivalContext";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <LanguageProvider>
      <TanzaniaArrivalProvider>
        <App />
      </TanzaniaArrivalProvider>
    </LanguageProvider>
  );
  