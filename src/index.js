import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

import FlowBuilder from "./FlowBuilder";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlowBuilder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
