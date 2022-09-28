import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FlowBuilder from "./FlowBuilder";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FlowBuilder />
  </StrictMode>
);
